const { addAttr, attrRegex } = require('../utils');

const iconRegex = /(\[icon).*(\])/gm;

const template = require('../templates').icon;

const replaceTag = str => {
  const icons = str.match(iconRegex);

  if (!icons) {
    return str;
  }

  icons.forEach(font => {
    const attrs = font.match(attrRegex);
    const options = addAttr(attrs);

    str = str.replace(font, template(options));
  });

  return str;
};

const findIcons = str => replaceTag(str);

module.exports = { findIcons };
