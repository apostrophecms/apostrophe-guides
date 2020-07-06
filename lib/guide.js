const getPages = require('./pages');
const { logError, setActive } = require('./utils');

const TEMPLATE = 'guide';

module.exports = (self, options) => {
  if (!options.sections) {
    logError(
      `Oops! Looks like you forgot to include any docs!.
In your module, be sure to include a sections key.`
    );
  }

  options.path = options.path || 'guide';
  options.public = options.public || false;

  const stylesheets = options.stylesheets;
  const scripts = options.scripts;

  const footer = options.footer || null;
  let footerTemplate = null;
  if (footer && footer.endsWith('.html')) {
    footerTemplate = footer;
  }

  self.data = {
    title: options.title || 'Guide',
    sections: getPages(self, options),
    path: options.path
  };

  const canView = req =>
    options.public === true ||
    (options.public === false && self.apos.permissions.can(req, 'guest'));
  const permissionErrorMessage = 'You must be logged in to view this page';

  const addDemoRoutes = (demos, data) => {
    demos.forEach(demo => {
      self.apos.app.get(`/${options.path}/${demo}`, (req, res) => {
        if (!canView(req)) {
          res.statusCode = 403;
          return res.send(permissionErrorMessage);
        }
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
          demoBodyClass: options.demoBodyClass || null,
          stylesheets,
          scripts
        }
      });
    }

    self.apos.app.get(`${url}`, (req, res) => {
      if (!canView(req)) {
        res.statusCode = 403;
        return res.send(permissionErrorMessage);
      }

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
            template,
            footer,
            footerTemplate
          }
        }
      });
    });
  };

  self.addRoutes = () => {
    self.apos.app.get(`/${options.path}`, (req, res) => {
      if (!canView(req)) {
        res.statusCode = 403;
        return res.send(permissionErrorMessage);
      }

      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...self.data,
          page: {
            ...self.data.sections[0].docs[0],
            footer,
            footerTemplate
          }
        }
      });
    });

    self.data.sections.forEach(section => {
      const { docs } = section;
      docs.forEach(doc => addRoute(doc));
    });
  };
};
