In this guide we will show how quickly you can test this plugin and start using it for development. For that we will install [development add-on](https://github.com/nordnet/cordova-hot-code-push/wiki/Local-Development-Plugin).

1. Create new Cordova project using command line interface and add iOS/Android platforms:

  ```sh
  cordova create TestProject com.example.testproject TestProject
  cd ./TestProject
  cordova platform add android
  cordova platform add ios
  ```
  Or use the existing one.

2. Add plugin:

  ```sh
  cordova plugin add cordova-hot-code-push-plugin
  ```

3. Add plugin for local development:

  ```sh
  cordova plugin add cordova-hot-code-push-local-dev-addon
  ```

4. Install Cordova Hot Code Push CLI client:

  ```sh
  npm install -g cordova-hot-code-push-cli
  ```

5. Start local server by executing:

  ```sh
  cordova-hcp server
  ```

  As a result you will see something like this:
  ```
  Running server
  Checking:  /Cordova/TestProject/www
  local_url http://localhost:31284
  Warning: .chcpignore does not exist.
  Build 2015.09.02-10.17.48 created in /Cordova/TestProject/www
  cordova-hcp local server available at: http://localhost:31284
  cordova-hcp public server available at: https://5027caf9.ngrok.com
  ```

6. Open new console window, go to the project root and launch the app:

  ```sh
  cordova run
  ```

  Wait until application is launched for both platforms.

7. Now open your `index.html` page in `www` folder of the `TestProject`, change something in it and save. In a few seconds you will see updated page on the launched devices (emulators).

From this point you can do local development, where all the changes are uploaded on the devices without the need to restart applications on every change you made.