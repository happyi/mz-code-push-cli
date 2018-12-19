To install the update you can call:
```js
chcp.installUpdate(installationCallback);

function installationCallback(error) {
  // do some work
}
```
If installation fails - `error` parameter will have the details of what went wrong. Otherwise - it's `null`.

Lets create an example performs the installation as soon as update is loaded.

```js
var app = {

  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  // Bind any events that are required.
  // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // deviceready Event Handler
  onDeviceReady: function() {
    // Add click event listener for our update button.
    // We do this here, because at this point Cordova modules are initialized.
    // Before that chcp is undefined.
    document.getElementById('myFetchBtn').addEventListener('click', app.checkForUpdate);
  },

  checkForUpdate: function() {
    chcp.fetchUpdate(app.fetchUpdateCallback);
  },

  fetchUpdateCallback: function(error, data) {
    if (error) {
      console.log('Failed to load the update with error code: ' + error.code);
      console.log(error.description);
      return;
    }
    console.log('Update is loaded, running the installation');

    chcp.installUpdate(app.installationCallback);
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

**Be advised:** even if you call `installUpdate` method with a callback function - installation related events are still broadcasted.