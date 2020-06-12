const { addAttr, attrRegex } = require('../utils');
const _ = require('lodash');

// Can't render this with a macro since we're replacing the font tag inline
const template = options => {
  const family = options.family ? `font-family: ${options.family}` : '';
  const weight = options.weight ? `font-weight: ${options.weight}` : '';
  const size = options.size ? `font-size: ${options.size}` : '';

  const styles = [family, weight, size].join(';');

  return `<div class="apos-guide-font">
  <div class="apos-guide-font-example" style="${styles}">${options.text ? options.text : options.family}</div>
  <div class="apos-guide-font-meta">
    <p class="apos-guide-font-name">${options.name ? options.name : options.family} ${options.weight ? _.startCase(options.weight) : ''}</p>
  </div>
</div>`;
};

const fontRegex = /(\[font).*(\])/gm;

const replaceTag = str => {
  const fonts = str.match(fontRegex);

  if (!fonts) {
    return str;
  }

  fonts.forEach(font => {
    const attrs = font.match(attrRegex);
    const options = addAttr(attrs);

    str = str.replace(font, template(options));
  });

  return str;
};

const findFonts = str => replaceTag(str);

module.exports = { findFonts };
