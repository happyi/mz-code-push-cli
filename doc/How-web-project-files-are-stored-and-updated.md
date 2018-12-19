Every Cordova project has a `www` folder, where all your web files are stored. When `cordova build` is executed - `www` content is copied to the platform-specific `www` folder:

- For Android: `platforms/android/assets/www`.
- For iOS: `platforms/ios/www`.

And they are packed with the application. We can't update them, since they have a read-only access. For this reason on the first startup those files are copied to the external storage. Since we don't want to block user while content is copied - we display an index page from the bundled resources. But on every next launch/update - we will load an index page from the external storage.

If your update includes additional plugins or some native code - you need to publish new version of the app on the store. And for that - increase build version of the app (that is mandatory anyway for every new release on the App Store or Google Play). On the next launch plugin checks if build version has changed, and if so - it will reinstall `www` folder on the external folder.

When you are developing your app - you might get confused: done some changes, launched the app - but see the old stuff. Now you know the reason: plugin is using version of the web project from the external storage. To reset the cache you can do one of the following:

- Manually uninstall the app, and then execute `cordova run`.
- Increase build version of your app to force the plugin to reinstall the `www` folder. You can do it by setting `android-versionCode` and `ios-CFBundleVersion` in `config.xml`.
- Install [local development add-on](https://github.com/nordnet/cordova-hot-code-push/wiki/Local-Development-Plugin) and let him handle folder reset for you. It will increase the build version of the app on each build, so you don't have to do it manually.

That was a short intro, so you could get the general idea. Now lets dig into more details.

As you will read in [Configuration files](https://github.com/nordnet/cordova-hot-code-push/wiki/Plugin-configuration-files) section - there is an application config, called `chcp.json`. In it there is a `release` preference, which defines version of your web content. It is a required preference and should be unique for every release. It is constructed by the CLI client like so: `yyyy.MM.dd-HH.mm.ss` (i.e., `2015.09.01-13.30.35`).

For each release plugin creates a folder with this name on the external storage, and puts in it all your web files. It is a base url for your project. This approach helps to solve several problems:

- Files caching issue. For example, on iOS css files are cached by the UIWebView, and even if we reload the index page - new styles were not applied. You had to kill the app in the task manager to flush it, or do some hacks to change the url of the css file.
- Less chances that update will corrupt the existing content, since we are using totally different folders for each release.
- But if it is corrupted - we can rollback to the previous version.

For example, lets say that currently in the app we are running version `2015.12.01-12.01.33`. That means the following:
- All web files are stored in `/sdcard/some_path/2015.12.01-12.01.33/www/`. Including Cordova specific.
- Index page, that is displayed to the user is `/sdcard/some_path/2015.12.01-12.01.33/www/index.html`.

At some moment of time we release a new version: `2016.01.03-10.45.01`. At first, plugin need to load it on the device, and that's what happens:

1. A new folder with the release version name is created on the external storage: `/sdcard/some_path/2016.01.03-10.45.01/`.
2. Inside it - `update` folder is created: `/sdcard/some_path/2016.01.03-10.45.01/update/`.
3. All new/changed files from the `chcp.manifest` are loaded to this `update` folder.
4. New `chcp.manifest` and `chcp.json` files are placed in the `update` folder.
5. Saving internally, that particular release is loaded and prepared for installation.

When it's time to install the update:

1. Plugin copies `www` folder from the current version (the one, that is displayed to the user) to the new release folder. In the terms of our example: copy everything from `/sdcard/some_path/2015.12.01-12.01.33/www/` into `/sdcard/some_path/2016.01.03-10.45.01/www/`.
2. Copy new/updated files and configs from the `update` folder into `www` folder: `/sdcard/some_path/2016.01.03-10.45.01/update/` -> `/sdcard/some_path/2016.01.03-10.45.01/www/`.
3. Remove `/sdcard/some_path/2016.01.03-10.45.01/update/` folder since we don't need it anymore.
4. Load index page from the new release: `/sdcard/some_path/2016.01.03-10.45.01/www/index.html`.

From this moment forward plugin will load index page from the new release folder, and the previous one will stay as a backup just in case.