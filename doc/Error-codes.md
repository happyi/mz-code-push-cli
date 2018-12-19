During the update download/installation process some errors can occur. You can match error code from the callback/event to the properties in `chcp.error` object.

Before v1.2.0 you had to use actual values. From now on, please, use named constants to make your code more readable and less dependent on the actual values. For example, instead of

```js
if (error.code === -2) {
  // do something
}
``` 
use 

```js
if (error.code === chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
  // do something
}
```

List of errors:

- `NOTHING_TO_INSTALL` - installation request was sent to the plugin, but there is nothing to install. Error code value is `1`.
- `NOTHING_TO_UPDATE` - nothing new is available for download. Error code value is `2`.
- `FAILED_TO_DOWNLOAD_APPLICATION_CONFIG` - failed to download new application config from the server. Either file doesn't exist or some internet connection problems. Error code value is `-1`.
- `APPLICATION_BUILD_VERSION_TOO_LOW` - application's build version is too low for this update. New web release requires newer version of the app. User must update it through the store. Error code value is `-2`.
- `FAILED_TO_DOWNLOAD_CONTENT_MANIFEST` - failed to download new content manifest file from the server. Check that `chcp.manifest` file is placed in the root of your `content_url`, specified in the application config. Error code value is `-3`.
- `FAILED_TO_DOWNLOAD_UPDATE_FILES` - failed to download updated/new files from the server. Check your `chcp.manifest` file: all listed files must be placed in the `content_url` from the application config. Also, check their hashes: they must match to the hashes in the `chcp.manifest`. Error code value is `-4`.
- `FAILED_TO_MOVE_LOADED_FILES_TO_INSTALLATION_FOLDER` - failed to move downloaded files to the installation folder. Can occur when there is no free space on the device. Error code value is `-5`.
- `UPDATE_IS_INVALID` - update package is broken. Before installing anything plugin validates downloaded files once more by checking their hashes with the one that specified in the loaded `chcp.manifest` file. If they doesn't match or we are missing some file - this error is thrown. Error code value is `-6`.
- `FAILED_TO_COPY_FILES_FROM_PREVIOUS_RELEASE` - failed to copy `www` folder files from the previous release to the new release folder. Can occur if device is out of free space. Error code value is `-7`.
- `FAILED_TO_COPY_NEW_CONTENT_FILES` - failed to copy new files to content directory. Can occur during the installation if there is not enough free space on device storage. Error code value is `-8`.
- `LOCAL_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND` - failed to load current application config from the local storage. Can occur if user manually deleted plugin working directories from the external storage. If so - we will try to rollback to the previous/bundled version. Error code value is `-9`.
- `LOCAL_VERSION_OF_MANIFEST_NOT_FOUND` - failed to load current manifest file from the local storage. Can occur if user manually deleted plugin working directories from the external storage. If so - we will try to rollback to the previous/bundled version. Error code value is `-10`.
- `LOADED_VERSION_OF_APPLICATION_CONFIG_NOT_FOUND` - failed to load new version of the application config from download folder (local storage). Can occur on installation process if user deletes plugin working directories from the external storage. If so - folders will be restored on the next launch. Error code value is `-11`.
- `LOADED_VERSION_OF_MANIFEST_NOT_FOUND` - failed to load new version of the content manifest from download folder (local storage). Can occur on installation process if user deletes plugin working directories from the external storage. If so - folders will be restored on the next launch. Error code value is `-12`.
- `FAILED_TO_INSTALL_ASSETS_ON_EXTERNAL_STORAGE` - failed to copy web project files from application bundle into external storage. Can occur if there is not enough free space on the users device. Action is performed on the first launch of the application. If it fails - plugin can't do it's job. Error code value is `-13`.
- `CANT_INSTALL_WHILE_DOWNLOAD_IN_PROGRESS` - error is thrown when we try to call `chcp.installUpdate` while update download is in progress. You will have to wait until download is done. Error code value is `-14`.
- `CANT_DOWNLOAD_UPDATE_WHILE_INSTALLATION_IN_PROGRESS` - error is thrown when we try to call `chcp.fetchUpdate` while installation is in progress. You will have to wait until installation is done. Error code value is `-15`.
- `INSTALLATION_ALREADY_IN_PROGRESS` - error is thrown when we try to call `chcp.installUpdate`, but installation is already in progress. Error code value is `-16`.
- `DOWNLOAD_ALREADY_IN_PROGRESS` - error is thrown when we try to call `chcp.fetchUpdate`, but download is already in progress. Error code value is `-17`.
- `ASSETS_FOLDER_IS_NOT_YET_INSTALLED` - error usually occur when we try to call `chcp` methods, while plugin is copying bundled sources on the external storage. This can happen only on the very first launch. Eventually this error will be removed. Error code value is `-18`.
- `NEW_APPLICATION_CONFIG_IS_INVALID` - error is thrown when plugin loaded new application's config from the server, but it has some invalid configuration in it. Most likely - missing `content_url` or `release` property. error code value is `-19`.