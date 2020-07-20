module.exports = {
  name: 'apostrophe-guides',
  label: 'Guide',
  extend: 'apostrophe-module',

  afterConstruct: self => {
    self.addRoutes();
    self.apos.on('csrfExceptions', self.addCsrfException);
    self.pushAsset('script', 'guides', { when: 'always' });
  },

  construct: (self, options) => {
    self.addCsrfException = exceptions => {
      exceptions.push(`/${options.path}/search`);
    };

    require('./lib/guide')(self, options);

    self.pushAsset('stylesheet', 'always', { when: 'always' });

    require('./lib/search')(self, options);
  }
};
