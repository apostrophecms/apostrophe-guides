const { addAttr, attrRegex } = require('../utils');

// Can't render this with a macro since we're replacing the font tag inline
const template = options => `<div class="apos-guide-icon">
  <div class="apos-guide-icon-example">
    <img class="apos-guide-icon-image" src="${options.src}" />
  </div>
  <div class="apos-guide-icon-meta">
    <p class="apos-guide-icon-name">${options.name}</p>
  </div>
</div>`;

const iconRegex = /(\[icon).*(\])/gm;

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
