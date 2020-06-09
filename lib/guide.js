const getDocs = require("./docs");
const { logError, setActive } = require("./utils");

const TEMPLATE = "guide";

module.exports = (self, options) => {
  if (!options.sections) {
    logError(
      `Oops! Looks like you forgot to include any docs!.
In your module, be sure to include a sections key.`
    );
  }

  options.path = options.path || "guide";

  const stylesheets = options.stylesheets;
  const scripts = options.scripts;

  self.data = {
    title: options.title || "Guide",
    sections: getDocs(self, options),
    path: options.path
  };

  const addDemoRoutes = (demos, data) => {
    demos.forEach(demo => {
      self.apos.app.get(`/${options.path}/${demo}`, (req, res) => {
        return self.sendPage(req, `demos/${demo}`, { ...data });
      });
    });
  };

  const addRoute = page => {
    const {
      name, url, type, doc, demos, template
    } = page;

    if (demos) {
      addDemoRoutes(demos, {
        demo: {
          baseCSSClass: options.baseCSSClass || null,
          stylesheets,
          scripts
        }
      });
    }

    self.apos.app.get(`${url}`, (req, res) => {
      const data = setActive(self.data.sections, page);

      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...self.data,
          sections: data,
          page: {
            name,
            type,
            doc,
            demos,
            template
          }
        }
      });
    });
  };

  self.addRoutes = () => {
    self.apos.app.get(`/${options.path}`, (req, res) => {
      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...self.data,
          page: { ...self.data.sections[0].docs[0] }
        }
      });
    });

    self.data.sections.forEach(section => {
      const { docs } = section;
      docs.forEach(doc => addRoute(doc));
    });
  };
};
