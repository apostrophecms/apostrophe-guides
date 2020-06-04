const fs = require("fs");
const path = require("path");

const marked = require("marked");
const glob = require("glob");

const TEMPLATES = require("./templates");
const { logError, stringify } = require("./utils");
const { findDemos } = require("./demos");

const MD = ".md";

const renderDoc = doc => {
  try {
    return marked(doc);
  } catch (err) {
    console.error(err);
  }
};

const buildSection = ({
  sectionName, sectionTemplate, docs, index
}) => {
  return docs.map(doc => {
    const name = path.basename(doc, MD);

    const data = {
      active: index === 0,
      name,
      url: `/styleguide/${sectionName.toLowerCase().replace(" ", "-")}/${name}`,
      template: sectionTemplate
    };

    const file = fs.readFileSync(doc, "utf8");

    data.doc = renderDoc(file);

    if (sectionTemplate === TEMPLATES.COMPONENTS) {
      data.demos = findDemos(file);
    }

    return data;
  });
};

const buildNavigation = sections =>
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
      name,
      template: template || TEMPLATES.DOCS,
      docs: []
    };

    docs.forEach(pattern => {
      const files = pattern.endsWith(MD) ? pattern : `${pattern}${MD}`;
      const docs = glob.sync(files);
      sectionData.docs = buildSection({
        sectionName: name,
        sectionTemplate: sectionData.template,
        docs,
        index
      });
    });

    return sectionData;
  });

const getDocs = sections => buildNavigation(sections);

module.exports = {
  getDocs,
  TEMPLATES
};
