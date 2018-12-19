(function(){
  var path = require('path'),
      prompt = require('prompt'),
      build = require('./build.js').execute,
      fs = require('fs'),
      Q = require('q'),
      _ = require('lodash'),
      s3sync = require('s3-sync-aws'),
      readdirp = require('readdirp'),
      loginFile = path.join(process.cwd(), '.chcplogin');

  module.exports = {
    execute: execute
  };

  function execute(context) {
    var executeDfd = Q.defer();

    build(context).then(function(){
      deploy(context).then(function(){
        executeDfd.resolve();
      });
    });

    return executeDfd.promise;
  }

  function deploy(context) {
    var executeDfd = Q.defer(),
        config,
        credentials,
        ignore = context.ignoredFiles;

    try {
      config = fs.readFileSync(context.defaultConfig, 'utf8');
      config = JSON.parse(config);
    } catch(e) {
      console.log('Cannot parse cordova-hcp.json. Did you run cordova-hcp init?');
      process.exit(0);
    }
    if(!config) {
      console.log('You need to run "cordova-hcp init" before you can run "cordova-hcp login".');
      console.log('Both commands needs to be invoked in the root of the project directory.');
      process.exit(0);
    }
    
    

   
    

   
   

    return executeDfd.promise;
  }
})();
