Package.describe({
  name: 'channikhabra:hot-loader',
  version: '0.0.1',
  summary: 'Hot-load code while developing meteor apps',
  git: '',
  documentation: 'README.org'
});

Npm.depends({watch: "0.16.0"});

Package.onUse(function(api) {
  api.use([
    "http",
    "nucleuside:live-update@0.3.1",
  ]);
  api.use('iron:router@0.9.0 || 1.0.0', 'server');

  api.addFiles([
    'lib/dispatcher/both/collections.js'
  ]);

  api.addFiles([
    'lib/watcher/watcher.js',
    'lib/dispatcher/server/routes.js',
    'lib/dispatcher/server/pubs.js'
  ], 'server');

  api.addFiles([
    'lib/dispatcher/client/observers.js',
    'lib/dispatcher/client/subs.js'
  ], 'client');

});
