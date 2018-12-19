In version 1.0.x local development mode was integrated in the plugin. Starting from v1.1.x it is moved to another [plugin](#local-development-add-on) as an add-on. Since v1.0 of hot code push plugin does some tweaks to the iOS project file to activate Swift support - after updating to v1.1.x you need to disable it.

The easiest way is to reinstall iOS platform:
```
cordova platform remove ios
cordova platform add ios
```
When platform is added - all project's plugins will be installed automatically.

Harder approach - remove Swift support manually. For that you need to open your iOS project in Xcode, and then do the following:

1. In the `Build Settings` set `Embedded Content Contains Swift Code` to `NO`.
2. In the project files find `<YOUR_PROJECT_NAME>-Prefix.pch` file, open it and remove `#import <YOUR_PROJECT_NAME>-Swift.h`. For example:

  ```
  #ifdef __OBJC__
      #import "TestProject-Swift.h"
  #endif
  ```
3. Build the project to check, if everything is fine.