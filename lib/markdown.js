const marked = require('marked');
const hljs = require('highlight.js');

const {
  findFonts, findIcons, findSwatches
} = require('./extensions');

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

const renderMarkdown = doc => {
  const options = {
    highlight
  };

  marked.setOptions(options);
  marked.use({ renderer });

  try {
    return marked(doc);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
};

const renderDoc = doc => {
  // Probably would be better to extend markedjs and include
  // findSwatches, findFonts, and findIcons
  let page = findSwatches(doc);
  page = findFonts(page);
  page = findIcons(page);

  return renderMarkdown(page);
};

module.exports = { renderDoc };
