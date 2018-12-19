Cordova hot code push plugin provides functionality to perform automatic updates of the web based content in your application. Basically, everything that is stored in `www` folder of your Cordova project can be updated using this plugin.

When you publish your application on the store - you pack in it all your web content: html files, JavaScript code, images and so on. There are two ways how you can update it:

1. Publish new version of the app on the store. But it takes time, especially with the App Store.
2. Sacrifice the offline feature and load all the pages online. But as soon as Internet connection goes down - application won't work.

This plugin is intended to fix all that. When user starts the app for the first time - it copies all the web files onto the external storage. From this moment all pages are loaded from the external folder and not from the packed bundle. On every launch plugin connects to your server and checks if the new version of web project is available for download. If so - it loads it on the device and installs on the next launch.

As a result, your application receives updates of the web content as soon as possible, and still can work in offline mode. Also, plugin allows you to specify dependency between the web release and the native version to make sure, that new release will work on the older versions of the application.

**Is it fine with App Store?** Yes, it is... as long as your content corresponds to what application is intended for and you don't ask user to click some button to update the web content. For more details please refer to [this wiki page](https://github.com/nordnet/cordova-hot-code-push/wiki/App-Store-FAQ).