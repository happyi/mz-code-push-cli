This requires cordova 5.0+ (current stable 1.5.3)

```sh
cordova plugin add cordova-hot-code-push-plugin
```

It is also possible to install via repo url directly (__unstable__)
```sh
cordova plugin add https://github.com/nordnet/cordova-hot-code-push.git
```

At the end of the installation plugin will recommend you to install [Cordova Hot Code Push CLI client](https://github.com/nordnet/cordova-hot-code-push/wiki/Cordova-Hot-Code-Push-CLI-client). This client will help you to:
- easily generate necessary configuration files;
- launch local server to listen for any changes in the web project and deploy new version immediately on the app.

Of course, you can use this plugin without the CLI client, but it will make your life easier.