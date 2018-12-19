Content manifest describes the state of the files inside your web project.
```json
[
  {
    "file": "index.html",
    "hash": "5540bd44cbcb967efef932bc8381f886"
  },
  {
    "file": "css/index.css",
    "hash": "e46d9a1c456a9c913ca10f3c16d50000"
  },
  {
    "file": "img/logo.png",
    "hash": "7e34c95ac701f8cd9f793586b9df2156"
  },
  {
    "file": "js/index.js",
    "hash": "0ba83df8459288fd1fa1576465163ff5"
  }
]
```

Based on it plugin detects which files were removed from the project, which has changed or added. As a result:
- at the update phase it will load from the server new/updated files;
- at the installation phase it will remove deleted files.

It should be placed in your `www` folder as `chcp.manifest` file. It is packed with the application and describes project files that are installed with the app from the store.

Also, it should be placed in the root of your `content_url` from application config. For example, if your `content_url` is `https://somedomain.com/www`, then url to the manifest file will be `https://somedomain.com/www/chcp.manifest`.

To generate `chcp.manifest` file execute `build` command of plugins CLI client inside your projects root directory:
```sh
cordova-hcp build
```

##### file
Relative path to the file inside the `www` folder (where your web content is placed).

Lets say, that your web project is located at:
``
/Workspace/Cordova/TestProject/www.
``
Then `file` value should be set relative to this folder as shown in the example above.

##### hash
MD5 hash of the file. Used to detect if file has been changed since last release. Also, used as a checksum to validate that loaded file is not corrupted.

**Important:** always update your `chcp.manifest` file after every change in the files of the web project. Otherwise plugin is not gonna detect any changes and won't update the app.

**Important:** if you updated your manifest file and uploaded files on the server, but get `checksum of file .... doesn't match the checksum ... from manifest` - please, check that your server is not caching files. If he does - in that case it can return old files to the app, and this will result into error.