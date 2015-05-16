var watch = Npm.require('watch'),
    fs = Npm.require('fs'),
    Future = Npm.require('fibers/future');

var monitorOptions = {
  'ignoreDotFiles': true,
  'ignoreUnreadableDir': true
};

var handleFileChange = function(file) {
  var filepath = file;
  var content = fs.readFileSync(file, 'utf-8'),
      type = file.split('.').reverse()[0];

  var res = Meteor.http.post('http://localhost:3000/_hotloader', {
    data: {
      path: file,
      type: type,
      content: content
    }
  });

  console.log("RES", res);
}.future();

function getAppDir() {
  var dir = process.cwd().split('/'),
      index = dir.indexOf('.meteor');

  dir = dir.slice(0, index).join('/');

  return dir;
}

var appDir = getAppDir();

watch.createMonitor(appDir, monitorOptions, function(monitor) {
  console.log("Hot-loader active in", appDir);

  monitor.on('changed', function(file) {
    handleFileChange(file);
  });

  monitor.on('created', function(file) {
    handleFileChange(file);
  });

  monitor.on('removed', function(file) {
    handleFileChange(file);
  });
});
