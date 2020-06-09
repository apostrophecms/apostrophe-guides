const marked = require("marked");

const stringify = str => JSON.stringify(str, null, 4);

const highlight = (indices, value, length) => {
  const text = value.split("");

  indices.forEach(positions => {
    // Only highlight words that match
    const space = positions[1] - positions[0] + 1;

    if (space === length) {
      text[positions[0]] = `<span class="apos-text-highlight">${
        text[positions[0]]
      }`;
      text[positions[1]] = `${text[positions[1]]}</span>`;
    }
  });

  return text.join("");
};

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
        : {
          ...doc,
          active: false
        }
    );

    updatedSections.push({
      ...section,
      docs: updated
    });
  });

  return updatedSections;
};

module.exports = {
  highlight,
  logError,
  renderDoc,
  setActive,
  stringify
};
