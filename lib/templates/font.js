const _ = require('lodash');

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

module.exports = template;
