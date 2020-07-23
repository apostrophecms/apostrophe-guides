const fs = require('fs');
const path = require('path');

const { logError } = require('./utils');

// Only match html code blocks with a filename.
const exampleRegex = /^(```html [\s\S]*.html)[\s\S]*(```\n)$/gm;
const fileNameRegex = /(?<= ).*(.html)\n/g;

const DEST = path.resolve(`${__dirname}/`, '../views/demos');

const findDemos = (doc, url) => {
  try {
    exportDemos(doc);
    const demos = doc.match(fileNameRegex);
    if (demos) {
      return demos.map(demo => path.join('/', url, demo.replace('\n', '')));
    } else {
      return null;
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
};

function exportDemos(doc) {
  const examples = doc.match(exampleRegex);
  if (examples) {
    examples.forEach(example => {
      let filename = example.match(fileNameRegex);

      if (filename === null) {
        logError(
          `No filename found for example code.
Please add a file name for:
${example}
Ex: \`\`\`html demo.html`
        );
      } else {
        filename = filename[0].replace('\n', '');
      }

      if (!fs.existsSync(DEST)) {
        fs.mkdirSync(DEST);
      }
      saveDemo(filename, example);
    });
  }
}

function saveDemo(filename, data) {
  const demoHTML = data
    .replace(
      `\`\`\`html ${filename}`,
      `{% extends 'apostrophe-guides:demo.html' %}
{% block content %}`
    )
    .replace('```', '{% endblock %}');

  fs.writeFile(`${DEST}/${filename}`, demoHTML, err => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
    }
  });
}

module.exports = { findDemos };
