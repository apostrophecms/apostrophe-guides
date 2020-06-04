const path = require("path");

module.exports = {
  name: "apostrophe-guides",
  alias: "guides",
  label: "Guide",
  extend: "apostrophe-module",

  construct: (self, options) => {
    require("./lib/guide")(self, options);
    self.addRoutes();

    self.apos.app.use(
      "/modules/guide/images",
      self.apos.express.static(path.join(__dirname, "images"))
    );
  }
};
