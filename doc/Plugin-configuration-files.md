Plugin uses two main configuration files:
- [Application config](https://github.com/nordnet/cordova-hot-code-push/wiki/Application-config) - holds release related information: release version, required build version for the native side and so on.
- [Content manifest](https://github.com/nordnet/cordova-hot-code-push/wiki/Content-manifest) - holds information about project files: their names and hashes.

These two are essential for the plugin to work. They describe if any new release is available for download and what has changed compared to the version already packed in the application.

There is also a [build options](https://github.com/nordnet/cordova-hot-code-push/wiki/Build-options) file which allow you to specify the plugin options in the command line when you build with `cordova build` command.