As you probably know, Cordova uses `config.xml` file to set different project preferences: name, description, starting page and so on. Using this config file you can also set options for the plugin.

Those preferences are specified inside the `<chcp>` block. For example:

```xml
<chcp>
    <config-file url="https://5027caf9.ngrok.com/chcp.json"/>
</chcp>
```

##### config-file
Defines URL from which application config should be loaded. URL is declared in the `url` property. **It is a required property.**

In the case of the local development mode, if `config-file` is not defined - it is automatically set to the applications config path on the local server.

##### native-interface
Defines current version of the native side.

```xml
<chcp>
    <native-interface version="5" />
</chcp>
```

This preference should be used with the conjunction of `min_native_interface` from `chcp.json`. If it's lower then the `min_native_interface` - plugin will not load new update from the server, since native side doesn't support it.

By default it is set to `1`.

#####  auto-download
Defines if plugin is allowed to download updates. Originally update fetching is performed automatically, but you can disable it and do that manually through the JavaScript module.

To disable updates auto downloads add to `config.xml`:
```xml
<chcp>
  <auto-download enabled="false" />
</chcp>
```
By default preference is set to `true`.

##### auto-install
Defines if plugin is allowed to install updates. Originally update installation is performed automatically, but you can disable it and do that manually through the JavaScript module.

To disable updates auto installation add to `config.xml`:
```xml
<chcp>
  <auto-install enabled="false" />
</chcp>
```
By default preference is set to `true`.