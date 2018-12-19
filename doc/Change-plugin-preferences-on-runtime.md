**DEPRECATED**

**Normally you use it only to set chcp.json url. Starting from v1.4.0 please use new options parameter in fetchUpdate() method.**

Normally all plugin preferences are set through the Cordova's `config.xml`. But you can change some of them through the JavaScript module.

In order to do that you can call:
```js
chcp.configure(options, callback);

function callback(error) {
  // do some work
}
```

Supported options:
- `config-file` - url to the application config. If set - this value will be used to check for updates instead of the one in `config.xml`.
- `auto-download` - by setting to `false` you can disable automatic update checks and downloads.
- `auto-install` - by setting to `false` you can disable automatic installations.

Those options must be set on `deviceready` event. You should do that on every page load, because if application gets updated through the store - those options will be overridden with the corresponding values from the `config.xml`.

If you are planning manually call update download/installation - then you should disable auto preferences in the `config.xml`

```xml
<chcp>
  <auto-download enabled="false" />
  <auto-install enabled="false" />
</chcp>
```

instead of doing so on the JS side.

**Important:** You should change those two options to `false` on the runtime **only** if you can't update the app on the store and set them in the `config.xml`. In that case - use them.

Lets say, that we disabled `auto-download` and `auto-install` in the `config.xml`. And at some point `config-file` url has changed, but we don't want to update the app on the store. In that case, we need to do the following:

1. Release new version of the web content, which is available on the previous `config-file` url.
2. In the new release modify `index.js` like so:

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
      // change plugin options
      app.configurePlugin();
    },

    configurePlugin: function() {
      var options = {
        'config-file': 'https://mynewdomain.com/some/path/mobile/chcp.json'
      };

      chcp.configure(options, configureCallback);
    },

    configureCallback: function(error) {
      if (error) {
        console.log('Error during the configuration process');
        console.log(error.description);
      } else {
        console.log('Plugin configured successfully');
        app.checkForUpdate();
      }
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

By doing so we, at first, tell the plugin to work with the new `config-file`, and as soon as he is configured - fetch and install the update.