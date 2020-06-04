const path = require("path");

module.exports = {
  name: "apostrophe-guides",
  alias: "guides",
  label: "Guide",
  extend: "apostrophe-module",

  construct: (self, options) => {
    require("./lib/guide")(self, options);

    self.pushAsset("stylesheet", "always", { when: "always" });

    self.apos.app.use(
      "/guide/images",
      self.apos.express.static(path.join(__dirname, "images"))
    );

    self.addRoutes();
  }
};
