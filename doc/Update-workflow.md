Before overloading your head with all the configuration stuff - let us describe to you the update workflow of the plugin. In general, without any technical details.

![Update workflow](https://github.com/nordnet/cordova-hot-code-push/blob/master/docs/images/update-workflow.png?raw=true)

1. User opens your application.
2. Plugin get's initialized and it launches update loader in the background thread.
3. Update loader takes `config-file` from the `config.xml` and loads JSON from the specified url. Then it compares `release` version of the loaded config to the currently installed one. If they are different - we go to the next step.
4. Update loader uses `content_url` from the application config to load manifest file. He uses it to find out, what has changed since the last release.
5. Update loader downloads all updated/new files from the `content_url`.
6. If everything went well - it sends notification, that update is ready for installation.
7. Update installed, and user is redirected to the index page of your application.

And that's it. Of course, there is a little more in it, but you get the general idea on how it works.