const fs = require("fs");
const path = require("path");

const glob = require("glob");

const TEMPLATES = require("./templates");

const {
  logError, renderDoc, stringify
} = require("./utils");

const { findDemos } = require("./demos");

const MD = ".md"; // We probably also should support `.markdown`, but maybe not now since not sure how common that is

module.exports = (self, options) => {
  const buildSection = ({
    sectionName, template, docs, index
  }) => {
    return docs.map(doc => {
      const name = path.basename(doc, MD);

      const data = {
        active: index === 0,
        name,
        url: `/${options.path}/${self.apos.utils.slugify(sectionName)}/${name}`, // TODO: This probably should be path.join for cross platform compatibility
        template
      };

      const file = fs.readFileSync(doc, "utf8");

      data.doc = renderDoc(file);

      if (template === TEMPLATES.COMPONENTS) {
        data.demos = findDemos(file);
      }

      return data;
    });
  };

  const buildData = sections =>
    sections.map((section, index) => {
      const {
        docs, name, template
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
        active: index === 0,
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
        template: template || TEMPLATES.DOCS,
        docs: allDocs,
        index
      });

      return sectionData;
    });

  return buildData(options.sections);
};
