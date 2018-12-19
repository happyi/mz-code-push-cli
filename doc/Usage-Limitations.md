## Don't rename/delete/move your index page

In any Cordova/Ionic project you define your index page in `config.xml` like this:
```xml
<content src="index.html" />
```

When the app is started - Cordova loads that page as an entry point. So, this is the only file you **can not** remove/move/rename in your project. But you can change it's content in any way you want, that's not forbidden.

Let's say you released new app and it loads `index.html` when launched. Then, you rename it to `main.html` in `chcp.manifest`. Plugin will load new manifest from the server, detect, that `index.html` was removed and delete it. And on the next app launch Cordova will try to load index page, that is defined in `config.xml`, but not gonna find it, and user will see an error page.

If you want to rename your index page - you need to rename it in `config.xml`, which means - release new version of the app on the stores. But again, you can change the content of the index page at any time.

## Do not clean plugin's inner preferences with cordova-plugin-nativestorage

[cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage) gives you access to native storage. In the case of iOS it's `NSUserDefault` class, which is, basically, a dictionary, where you can store simple preferences in key-value manner. 

Hot code push plugin stores some inner stuff in it, that is needed for updates to work properly.

With `cordova-plugin-nativestorage` you can call `NativeStorage.clear()` which will remove all preferences from the native storage (a.k.a NSUserDefaults). As a result, on the next launch user will see a bundled `www` folder content instead of the loaded one. Plugin will re-download latest release and everything will be back to normal, but still: any time you call `NativeStorage.clear()` - app will be reset to initial state.