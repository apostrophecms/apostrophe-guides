const fs = require("fs");
const path = require("path");

const { logError } = require("./utils");

const exampleRegex = /^(```html)[\s\S]*(```)$/gm;
const fileNameRegex = /(?<= ).*(.html)\n/g;

const DEST = path.resolve(`${__dirname}/`, "../views/demos");

const saveDemo = (filename, data) => {
  const demoHTML = data
    .replace(`\`\`\`html ${filename}`, "")
    .replace("```", "");

  fs.writeFile(`${DEST}/${filename}`, demoHTML, err => {
    if (err) {
      return console.error(err);
    }
  });
};

const exportDemos = doc => {
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
        filename = filename[0].replace("\n", "");
      }

      if (!fs.existsSync(DEST)) {
        fs.mkdirSync(DEST);
      }
      saveDemo(filename, example);
    });
  }
};

const findDemos = doc => {
  try {
    exportDemos(doc);
    const demos = doc.match(fileNameRegex);
    if (demos) {
      return demos.map(
        demo => `apostrophe-guides:demos/${demo.replace("\n", "")}`
      );
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { findDemos };
