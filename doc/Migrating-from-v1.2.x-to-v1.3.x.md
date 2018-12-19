If you are not using `min_native_interface` in your `chcp.json` - you can ignore this section. Everyone else - please, keep reading.

In the previous versions of the plugin `min_native_interface` was compared with the code (build) version of the application. But that approach had the two main problems:

1. When building for Android - Cordova manipulates with `versionCode` preference, what could lead to unexpected behaviour.
2. In iOS `CFBundleVersion` is a string, so you could define it like `1.2.3`, while plugin expects it to be a number.

To avoid these problems in the future - new preference was added to the plugin. It will now use `<native-interface version="some_number" />`, that you define in `config.xml` of your project. As a result, if `chcp.json` has a `min_native_interface` preference - it will be compared with `<native-interface />` from the `config.xml`.

So, if you updating to v1.3.0 and using `min_native_interface` - don't forget to define `<native-interface />` in project's `config.xml`.