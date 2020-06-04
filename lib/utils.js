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
  const updatedSections = [];

  sections.forEach(section => {
    const updated = section.docs.map(doc =>
      doc.name === page.name
        ? {
          ...doc,
          active: true
        }
        : doc
    );

    updatedSections.push({
      ...section,
      docs: updated
    });
  });

  return updatedSections;
};

module.exports = {
  logError,
  renderDoc,
  setActive,
  stringify
};
