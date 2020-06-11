const marked = require("marked");

const highlight = (code, language) => {
  const hljs = require('highlight.js');
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(validLanguage, code).value;
};

const renderDoc = doc => {
  const options = {
    highlight
  };

  marked.setOptions(options);

  try {
    return marked(doc);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { renderDoc };
