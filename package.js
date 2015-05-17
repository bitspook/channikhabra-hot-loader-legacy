Package.describe({
  name: 'channikhabra:hot-loader-legacy',
  version: '0.0.1',
  summary: 'Hot-load code while developing meteor apps (meteor-only solution)',
  git: 'https://github.com/channikhabra/channikhabra-hot-loader-legacy',
  documentation: 'README.org'
});

Npm.depends({watch: "0.16.0"});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@0.9.0")
  api.use([
    "http", "underscore",
    "nucleuside:live-update@0.3.1",
  ]);
  api.use('iron:router@0.9.0 || 1.0.0', 'server');

  api.addFiles([
    'lib/dispatcher/both/collections.js'
  ]);

  api.addFiles([
    'lib/watcher/watcher.js',
    'lib/dispatcher/server/routes.js',
    'lib/dispatcher/server/pubs.js',
    'lib/hotloader.js',
  ], 'server');

  api.addFiles([
    'lib/dispatcher/client/observers.js',
    'lib/dispatcher/client/subs.js'
  ], 'client');

  api.export(['HotLoader'], ['server']);

});
