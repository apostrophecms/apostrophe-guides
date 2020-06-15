const { addAttr, attrRegex } = require('../utils');

const fontRegex = /(\[font).*(\])/gm;

const template = require('../templates').font;

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
