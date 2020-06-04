const marked = require("marked");

const stringify = str => JSON.stringify(str, null, 4);

const logError = string => {
  console.error(`Error: 'apostrophe-guides' \n${string}\n`);
};

const renderDoc = doc => {
  try {
    return marked(doc);
  } catch (err) {
    console.error(err);
  }
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

module.exports = {
  logError,
  renderDoc,
  setActive,
  stringify
};
