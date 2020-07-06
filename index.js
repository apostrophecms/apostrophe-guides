module.exports = {
  name: 'apostrophe-guides',
  label: 'Guide',
  extend: 'apostrophe-module',

  afterConstruct: self => {
    self.addRoutes();
  },

  construct: (self, options) => {
    require('./lib/guide')(self, options);

    self.pushAsset('stylesheet', 'always', { when: 'always' });

    require('./lib/search')(self, options);
  }
};
