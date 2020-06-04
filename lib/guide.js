const { getDocs } = require("./docs");

module.exports = (self, options) => {
  const SLUG = options.slug || "guide";

  const data = {
    title: options.title,
    baseCSSClass: options.baseCSSClass || "",
    sections: getDocs(options.sections)
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
  };

  const addRoute = page => {
    const {
      name, url, type, doc, demos, template
    } = page;

    self.apos.app.get(`${url}`, (req, res) => {
      setActive(data.sections, page);
      return self.sendPage(req, "guide", {
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
    self.apos.app.get(`/${SLUG}`, (req, res) => {
      return self.sendPage(req, "guide", {
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
