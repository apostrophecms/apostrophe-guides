const path = require("path");

module.exports = {
  name: "apostrophe-guides",
  label: "Guide",
  extend: "apostrophe-module",

  afterConstruct: self => {
    self.addRoutes();
  },

  construct: (self, options) => {
    require("./lib/guide")(self, options);

    self.pushAsset("stylesheet", "always", { when: "always" });

    self.apos.app.use(
      "/guide/images",
      self.apos.express.static(path.join(__dirname, "public", "images"))
    );

    require("./lib/search")(self, options);
  }
};
