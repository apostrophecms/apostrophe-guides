const convert = require('color-convert');

const {
  addAttr, attrRegex, logError
} = require('../utils');

const template = require('../templates').swatch;

const swatchRegex = /(\[swatch).*(\])/gm;

const replaceTag = str => {
  const swatches = str.match(swatchRegex);

  if (!swatches) {
    return str;
  }

  swatches.forEach(swatch => {
    const attrs = swatch.match(attrRegex);
    const options = addAttr(attrs);

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

    str = str.replace(swatch, template(options));
  });

  return str;
};

const findSwatches = str => replaceTag(str);

module.exports = { findSwatches };
