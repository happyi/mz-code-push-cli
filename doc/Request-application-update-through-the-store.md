As stated in [Application config](https://github.com/nordnet/cordova-hot-code-push/wiki/Application-config) section we can set minimum required version of the native side for our web releases (`min_native_interface` preference). When plugin loads new application config from the server and sees that current build version of the app is too low - it finishes with error code `chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW`. By checking the error code on the JavaScript side we can understand that and request user to update the app through the store (Google Play or App Store).

You can do that anyway you want. The most standard approach is to show dialog with update request message and two buttons: first redirects user to the store, and the second closes the dialog. Our plugin helps you do exactly this.

All you need to do is:

1. In your application config set `android_identifier` and `ios_identifier` preferences.
2. On JavaScript side capture corresponding update error and call `chcp.requestApplicationUpdate` method.

Time for some example. For simplicity we will subscribe on `chcp_updateLoadFailed` event.

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
    document.addEventListener('chcp_updateLoadFailed', this.onUpdateLoadError, false);
  },

  // deviceready Event Handler
  onDeviceReady: function() {
  },

  onUpdateLoadError: function(eventData) {
    var error = eventData.detail.error;
    if (error && error.code == chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
        console.log('Native side update required');
        var dialogMessage = 'New version of the application is available on the store. Please, update.';
        chcp.requestApplicationUpdate(dialogMessage, this.userWentToStoreCallback, this.userDeclinedRedirectCallback);
    }
  },

  userWentToStoreCallback: function() {
    // user went to the store from the dialog
  },

  userDeclinedRedirectCallback: function() {
    // User didn't want to leave the app.
    // Maybe he will update later.
  }
};

app.initialize();
```