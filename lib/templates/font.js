const _ = require('lodash');

const template = ({
  name, family, weight, size, text
}) => {
  const fontFamily = `font-family: ${family};`;
  const fontWeight = weight ? `font-weight: ${weight};` : null;
  const fontSize = size ? `font-size: ${size};` : null;

  const styles = [fontFamily, fontWeight, fontSize].join('').trim();

  const txt = name || family;
  const _weight = weight ? _.startCase(weight) : null;
  const title = [txt, _weight].join(' ').trim();

  return `<div class="apos-guide-font">
  <div class="apos-guide-font-example" style="${styles}">${text || family}</div>
  <div class="apos-guide-font-meta">
    <p class="apos-guide-font-name">${title}</p>
  </div>
</div>`;
};

module.exports = template;
