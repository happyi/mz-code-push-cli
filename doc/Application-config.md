Application config holds information about the current release of the web project.

Simplest example is:
```json
{
  "content_url": "https://5027caf9.ngrok.com",
  "release": "2015.09.01-13.30.35"
}
```

It should be placed in your `www` folder as `chcp.json` file. It is packed with the application and describes the version of the project that is installed on the device from the store.

You can either create it manually, or let `cordova-hcp` utility to do it for you. Just run `cordova-hcp init` in your project's root folder, and then on every new build execute `cordova-hcp build`. For more details [read the documentation](https://github.com/nordnet/cordova-hot-code-push-cli) for the CLI client.

##### content_url
URL on the server, where all your project files are located. Plugin will use it as a base url to download content manifest and all updated files. **This is a required option**.

##### release
Any string that describes your web project version. Should be unique for each release. Based on it plugin will detect if new content is available for download. **This is a required option**.

**Important:** plugin will compare release values as strings for equality, and if they are not equal - it will decide that new release is available.

##### min_native_interface
Minimum version of the native side that is required to run this web content. For example, if you add new plugin to the project - most likely it will require native version to update. In order to prevent user from downloading web content that he can't use right now - you increase the `min_native_interface` value.

In the application you define current native version like so:
```xml
<chcp>
    <native-interface version="some_number" />
</chcp>
```

Lets say, that in `config.xml` we set native interface version to 5:
```xml
<chcp>
    <native-interface version="5" />
</chcp>
```

And current application config on the server is:
```json
{
  "content_url": "https://5027caf9.ngrok.com",
  "release": "2015.09.01-13.30.35",
  "min_native_interface": 5
}
```

In that case plugin will load and install update without any problem, since native side can handle new web content.

At some point we release a new version and publish it on the server with the config:
```json
{
  "content_url": "https://5027caf9.ngrok.com",
  "release": "2015.09.05-12.20.15",
  "min_native_interface": 10
}
```

When plugin loads that new config from the server and sees, that it's `min_native_interface` is higher then the `<native-interface />` in `config.xml` - it's not gonna load new release. Instead, it will send `chcp_updateLoadFailed` notification with error, stating that application update is required. In details this is described in [Request application update through the store](https://github.com/nordnet/cordova-hot-code-push/wiki/Request-application-update-through-the-store) section below.

**Note:** right now you can't specify different values for `min_native_interface` for different platforms. But this can be added later, if needed.

##### update
Defines when to perform the update. Supported values are:
- `start` - install update when application is launched. Used by default.
- `resume` - install the update when application is resumed from background state.
- `now` - install update as soon as it has been downloaded.

```json
{
  "content_url": "https://5027caf9.ngrok.com",
  "release": "2015.09.05-12.20.15",
  "update": "resume"
}
```

You can disable automatic installation through the JavaScript. How to do that - read in [JavaScript module](https://github.com/nordnet/cordova-hot-code-push/wiki/JavaScript-module) section.

##### android_identifier
Package name of the Android version of the application. If defined - used to redirect user to the applications page on the Google Play Store.

##### ios_identifier
Identification number of the application, for example: `id345038631`. If defined - used to redirect user to the applications page on the App Store.