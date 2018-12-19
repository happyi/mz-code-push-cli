When you develop your app locally - the general process looks like that:

1. Do some changes in the web project.
2. Execute `cordova run` to build and launch the app.
3. Wait for a while and see the result.

To see the results for even a smallest change you need to rebuild and restart the app. And that can take a while. And it is kind of boring.

In order to speed this up - you can use [Hot Code Push Local Development Add-on](https://github.com/nordnet/cordova-hot-code-push-local-dev-addon). Setup is pretty simple:

1. Add the plugin to the project.
2. Start local server by executing `cordova-hcp server`.
3. Add `<local-development enabled="true" />` to the `<chcp />` block of your project's `config.xml` file.
4. Launch the app.

From that moment, all the changes in the web project will be detected by the plugin, and immediately loaded into the app without the need to restart it.

You will have to restart the app only if you add some new plugin to the project.

**Important:** you should use this add-on for development purpose only. Consider deleting it before building the release version by executing `cordova plugin remove cordova-hot-code-push-local-dev-addon`.