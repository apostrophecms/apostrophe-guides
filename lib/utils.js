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

module.exports = {
  logError,
  renderDoc,
  stringify
};
