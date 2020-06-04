const getDocs = require("./docs");
const TEMPLATE = "guide";

module.exports = (self, options) => {
  if (!options.sections) {
    logError(
      `Oops! Looks like you forgot to include any docs!.
In your module, be sure to include a sections key.`
    );
  }

  options.subdirectory = options.subdirectory || "guide";

  const data = {
    title: options.title || "Guide",
    baseCSSClass: options.baseCSSClass || "",
  };

  const setActive = (sections, page) => {
    sections.forEach(section => {
      section.docs.map(doc => {
        if (doc.name === page.name) {
          doc.active = true;
        } else {
          doc.active = false;
        }
        return doc;
      });
    });
    sections: getDocs(self, options)
  };

  const addRoute = page => {
    const {
      name, url, type, doc, demos, template
    } = page;

    self.apos.app.get(`${url}`, (req, res) => {
      setActive(data.sections, page);
      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...data,
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
    self.apos.app.get(`/${options.subdirectory}`, (req, res) => {
      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...data,
          page: { ...data.sections[0].docs[0] }
        }
      });
    });

    data.sections.forEach(section => {
      const { docs } = section;
      docs.forEach(doc => addRoute(doc));
    });
  };
};
