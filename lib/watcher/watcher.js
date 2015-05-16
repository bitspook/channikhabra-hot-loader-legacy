enableWatch = function() {
  /**
   * This watcher is not of much use since it updates the page only after Meteor has
   * refreshed the client. I am keeping it here for the sake of completion, and loading
   * this code with this simplistic wrapper function only if user is too lazy to install
   * external watch.
   */

  var watch = Npm.require('watch'),
      fs = Npm.require('fs'),
      Future = Npm.require('fibers/future');

  var monitorOptions = {
    'ignoreDotFiles': true,
    'ignoreUnreadableDir': true
  };

  var handleFileChange = function(file, options) {
    options = options || {};

    if(!HotLoader.config.watch) {
      return;
    }

    var content,
        url = Meteor.absoluteUrl() + '_hotloader',
        type = file.split('.').reverse()[0];

    if (!! options.removed)
      content = '';
    else
      content = fs.readFileSync(file, 'utf-8');

    var res = Meteor.http.post(url, {
      data: {
        path: file,
        type: type,
        content: content
      }
    });
  }.future();

  function getAppDir() {
    var dir = process.cwd().split('/'),
        index = dir.indexOf('.meteor');

    dir = dir.slice(0, index).join('/');

    return dir;
  }

  var appDir = getAppDir();

  watch.createMonitor(appDir, monitorOptions, function(monitor) {
    console.log("Hot loader watch enabled");

    monitor.on('changed', function(file) {
      handleFileChange(file);
    });

    monitor.on('created', function(file) {
      handleFileChange(file);
    });

    monitor.on('removed', function(file) {
      handleFileChange(file, {removed: true});
    });
  });

};
