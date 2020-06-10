const convert = require('color-convert');

const { logError } = require('./utils');

// Can't render this with a macro since we're replacing the swatch tag inline
const template = options => `<div class="apos-guide-swatch">
  <div class="apos-guide-swatch-color" style="background-color: ${options.hex}"></div>
  <div class="apos-guide-swatch-meta">
    <p class="apos-guide-swatch-name">${options.name}</p>
    <span class="apos-guide-swatch-hex">${options.hex}</span>
    <span class="apos-guide-swatch-rgb">${options.rgb}</span>
  </div>
</div>`;

const swatchRegex = /(\[swatch).*(\])/gm;

const replaceTag = (self, str) => {
  const swatches = str.match(swatchRegex);

  if (!swatches) {
    return str;
  }

  swatches.forEach(match => {
    const options = {};
    const swatch = match.replace('[swatch', '').replace(']', '');
    const attrs = swatch.trim().split(' ');

    attrs.forEach(attr => {
      const keyVal = attr.split('=');
      options[keyVal[0]] = keyVal[1].replace(/"/g, '');
    });

    if (!options.hex && !options.rgb) {
      logError(`Oops! No color values found for ${options.name}.
Please add either a hex or an rgb value.`);
    }

    if (!options.hex) {
      options.hex = `#${convert.rgb.hex(options.rgb)}`;
    }

    if (!options.rgb) {
      const hex = options.hex.replace('#');
      options.rgb = `rgb(${convert.hex.rgb(hex)})`;
    }

    str = str.replace(match, template(options));
  });

  return str;
};

const findSwatches = (self, str) => replaceTag(self, str);

module.exports = { findSwatches };
