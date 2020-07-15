const fs = require('fs');

const getPages = require('./pages');
const { findDemos } = require('./demos');
const { renderDoc } = require('./markdown');
const { logError, setActive } = require('./utils');

const TEMPLATE = 'guide';

module.exports = (self, options) => {
  if (!options.sections) {
    logError(
      `Oops! Looks like you forgot to include any docs!.
In your module, be sure to include a sections key.`
    );
  }

  const { NODE_ENV } = process.env;

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
    const { url, demos } = page;

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

      const sections = setActive(self.data.sections, page);
      const pageData = getPage(page);

      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...self.data,
          sections,
          page: {
            ...pageData,
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

      const sections = setActive(
        self.data.sections,
        self.data.sections[0].docs[0]
      );

      const pageData = getPage(self.data.sections[0].docs[0]);

      return self.sendPage(req, TEMPLATE, {
        guide: {
          ...self.data,
          sections,
          page: {
            ...pageData,
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

  function isDev(env) {
    return env === 'development' || env === 'dev';
  }

  function getPage(page) {
    if (isDev(NODE_ENV)) {
      const file = fs.readFileSync(page.filepath, 'utf8');

      page.demos = findDemos(file);
      page.doc = renderDoc(file);

      return page;
    }
    return page;
  }
};
