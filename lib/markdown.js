const marked = require("marked");
const hljs = require('highlight.js');

const highlight = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(validLanguage, code).value;
};

const renderer = {
  // add links to headings
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `<h${level} id="${escapedText}" class="apos-guide-heading">
  <a class="apos-guide-heading-link" href="#${escapedText}">${text}</a>
</h${level}>`;
  }
};

const renderDoc = doc => {
  const options = {
    highlight
  };

  marked.setOptions(options);
  marked.use({ renderer });

  try {
    return marked(doc);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { renderDoc };
