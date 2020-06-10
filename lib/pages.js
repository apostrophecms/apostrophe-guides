const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const glob = require("glob");

const {
  logError, renderDoc, stringify
} = require("./utils");

const { findDemos } = require("./demos");
const { findFonts } = require('./fonts');
const { findSwatches } = require('./swatches');

const MD = ".md"; // We probably also should support `.markdown`, but maybe not now since not sure how common that is

module.exports = (self, options) => {
  const buildSection = ({
    sectionName, template, docs, index
  }) => {
    return docs.map(doc => {
      const name = path.basename(doc, MD);

      const data = {
        name: _.startCase(name),
        url: path.join('/', options.path, self.apos.utils.slugify(sectionName), _.kebabCase(name)),
        template
      };

      const file = fs.readFileSync(doc, "utf8");

      let page = findSwatches(file);
      page = findFonts(page);

      data.demos = findDemos(file);

      data.doc = renderDoc(page);

      return data;
    });
  };

  const buildData = sections =>
    sections.map((section, index) => {
      const {
        docs, name
      } = section;

      if (!name) {
        logError(
          `Oops! Looks like you forgot to include a name for your section.
    Add a name key to:
    ${stringify(section)}`
        );
      }

      if (!docs) {
        logError(
          `Oops! Looks like you forgot to include a path to your docs.
    Add a docs key to:
    ${stringify(section)}`
        );
      }

      const sectionData = {
        name,
        docs: []
      };

      // We only care about markdown files, so make sure that's the only file we're looking for
      const paths = docs.map(src => (src.endsWith(MD) ? src : `${src}${MD}`));

      const globs = [];

      // Since we accept an array of files and globs, combine them into a single array
      paths.forEach(src => {
        let files = glob.sync(src);

        if (files.length === 0) {
          logError(
            `Oops! Couldn't find ${src}.
        Are you sure that's the correct path?`
          );
        }

        globs.push(files);
      });

      const allDocs = globs.flat();

      sectionData.docs = buildSection({
        sectionName: name,
        docs: allDocs,
        index
      });

      return sectionData;
    });

  return buildData(options.sections);
};
