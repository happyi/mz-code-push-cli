As described in [Cordova config preferences](#cordova-config-preferences) section - you can change plugin options in the Cordova's `config.xml` file.

But what if you want to change it on the build phase through the command line? For that purpose you can use `chcpbuild.options` file.

It must be placed in the root directory of your Cordova project. In it you specify (in JSON) all the preferences you want to add/change in the resulting `config.xml` file. The original `config.xml` (in the projects root directory) is not touсhed, we modify the platform-specific one on `after_prepare` phase.

Lets say, that your Cordova project is located in the `/Cordova/TestProject` folder. Base `config.xml` file (`/Cordova/TestProject/config.xml`) has the following preferences:

```xml
<chcp>
  <config-file url="https://company_server.com/mobile/www/chcp.json" />
</chcp>
```

Now we create `chcpbuild.options` file inside `/Cordova/Testproject/` and put in it the following content:
```json
{
  "dev": {
    "config-file": "https://dev.company_server.com/mobile/www/chcp.json"
  },
  "production": {
    "config-file": "https://company_server.com/mobile/www/chcp.json"
  },
  "QA": {
    "config-file": "https://test.company_server.com/mobile/www/chcp.json"
  }
}
```

In order to build the app, configured to work with development server, we can run command:
```sh
cordova build -- chcp-dev
```

As a result, platform-specific `config.xml` file (for example, `/Cordova/TestProject/platforms/android/res/xml/config.xml`) will have:
```xml
<chcp>
  <config-file url="https://dev.company_server.com/mobile/www/chcp.json"/>
</chcp>
```

As you might notice - in console we prefixed build option name with the `chcp-`. This is required, so the plugin would know, that this option is for him. Also, it prevents conflicts between different plugins/hooks you already have.

When application is ready for testing - we can build it, configured to work with test server:
```sh
cordova build -- chcp-QA
```

And the plugin-specific `config.xml` will become:
```xml
<chcp>
  <config-file url="https://test.company_server.com/mobile/www/chcp.json"/>
</chcp>
```

When we are ready to release new version on the store (Google Play, App Store) - we build, as usual, with command:
```sh
cordova build --release
```
In that case `config.xml` is not modified.

If `chcpbuild.options` not used - plugin will use preferences from the project's main `config.xml`.

##### config-file url preference

```json
"config-file": "https://url/to/your/chcp.json"
```

or

```json
"config-file": {
    "url": "https://url/to/your/chcp.json"
}
```

##### auto-download preference

```json
"auto-download": {
    "enabled": false
}
```

##### auto-install preference

```json
"auto-install": {
    "enabled": false
}
```

##### native-interface preference

```json
"native-interface": {
    "version": 5
}
```