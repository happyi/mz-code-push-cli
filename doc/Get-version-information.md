When needed - you can request version information via JS API:

```js
chcp.getVersionInfo(callback);

function callback(err, data) {
  console.log('Current web version: ' + data.currentWebVersion);
  console.log('Previous web version: ' + data.previousWebVersion);
  console.log('Loaded and ready for installation web version: ' + data.readyToInstallWebVersion);
  console.log('Application version name: ' + data.appVersion);
  console.log('Application build version: ' + data.buildVersion);
}
```
where:
- `currentWebVersion` - version of the web content, that is displayed to the user. Basically, value of the `release` property from `chcp.json` file in your local `www` folder.
- `previousWebVersion` - previous web content version. This is a version of our backup. Can be empty, if there were no updates installed.
- `readyToInstallWebVersion` - version number of the web content, that was loaded by the plugin and ready to be installed. Basically, value of the `release` property from `chcp.json` file on your server. Can be empty, if no update is waiting for installation.
- `appVersion` - application's version name. This version is visible to the user on the stores.
- `buildVersion` - application's build version number.