In some cases you want to control update flow from the JavaScript side. To check, if update was loaded on the device and available for download - use the following method:

```js
chcp.isUpdateAvailableForInstallation(callbackMethod);

function callbackMethod(error, data) {
  if (error) {
    console.log('No update was loaded => nothing to install');
    return;
  }

  console.log('Current content version: ' + data.currentVersion);
  console.log('Ready to be installed:' + data.readyToInstallVersion);
}
```

Now small demo on how to use it. First, we disable `auto-install` and `auto-download` in `config.xml`:

```xml
<chcp>
  <auto-download enabled="false" />
  <auto-install enabled="false" />
</chcp>
```

Then in JavaScript we will check on startup, if update was previously loaded from the server. If it was - we install it, if not - we download it, so it would be installed next time.

```js
var app = {

  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    // check, if update was previously loaded and available for download
    chcp.isUpdateAvailableForInstallation(function(error, data) {
      if (error) {
        console.log('Nothing to install. Executing fetch.');
        chcp.fetchUpdate(app.fetchUpdateCallback);
        return;
      }

      // update is in cache and can be installed - install it
      console.log('Current version: ' + data.currentVersion);
      console.log('About to install: ' + data.readyToInstallVersion);
      chcp.installUpdate(app.installationCallback);
    });
  },

  fetchUpdateCallback: function(error, data) {
    if (error) {
      console.log('Failed to load the update with error code: ' + error.code);
      console.log(error.description);
      return;
    }
    console.log('Update is loaded');
  },

  installationCallback: function(error) {
    if (error) {
      console.log('Failed to install the update with error code: ' + error.code);
      console.log(error.description);
    } else {
      console.log('Update installed!');
    }
  }
};

app.initialize();
```