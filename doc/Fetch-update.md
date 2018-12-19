You can download updates from the server by using JS API:
```js

var options = {
  'config-file': 'https://mydomain.com/chcp.json',
  'request-headers': {
    'foo': 'bar'
  }
};
chcp.fetchUpdate(updateCallback, options);

function updateCallback(error, data) {
  // do some work
}
```
where:
- `updateCallback` - callback function, that get's called when we finished/failed to download new update from the server.
- `options` - additional options to the request. If not set - preferences from `config.xml` are used.

Callback function receives two parameters:
 -`error` - error if any happened during the update check; `null` if everything went fine;
 -`data` - additional data, sent from the native side. For now it can be ignored.

Options can have two properties:
- `config-file` - url of the chcp.json config on the server. Plugin will use this one instead of `<config-file url="">` from the `config.xml`.
- `request-headers` - additional HTTP headers, that will be added to all requests in update download process, including loading configs and new/changed files.

Let's assume that in `index.html` page we have some button, by clicking on which we want to fetch the update. In order to do that we need to:

1. Subscribe on `click` event.
2. Call `chcp.fetchUpdate()` when button is clicked.
3. Handle update result.

So, lets modify our `index.js` file:
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
    } else {
      console.log('Update is loaded');
    }
  }
};

app.initialize();
```

**Be advised:** even if you call `fetchUpdate` method with a callback function - update related events are still broadcasted.

### Providing headers to fetchUpdate from native side

In some cases you might want to embed Cordova WebView in your native app only for some particular views. And you want to set headers to `fetchUpdate` method from native side instead of JS. Depending on the platform you can do it like this:

For iOS:

```objective-c
#import "HCPFetchUpdateOptions.h"

@implementation MyClass

// ...some other methods...

- (void)setupCHCPPlugin {
    NSURL *configFileURL = [NSURL URLWithString:@"http://mydomain.com/chcp.json"];
    NSDictionary *requestHeaders = @{@"foo": @"bar"};
    HCPFetchUpdateOptions *options = [[HCPFetchUpdateOptions alloc] initWithConfigURL:configFileURL requestHeaders:requestHeaders];
    
    chcpPluginInstance.defaultFetchUpdateOptions = options;
}

@end
```

For Android:
```java
import com.nordnetab.chcp.main.config.FetchUpdateOptions;

public class MyClass {
 
    // ...some other methods...

    private void setupCHCPPlugin() {
        final String configFileURL = "http://mydomain.com/chcp.json";
        final Map<String, String> requestHeaders = new HashMap<String, String>();
        requestHeaders.put("foo", "bar");

        final FetchUpdateOptions options = new FetchUpdateOptions(configFileURL, requestHeaders);

        chcpPluginInstance.setDefaultFetchUpdateOptions(options);
    }
    
}
```

Be advised, that if you pass update options from JS side - plugin will use them instead of the default ones.