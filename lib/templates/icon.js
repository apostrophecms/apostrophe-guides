const template = options => {
  const nameTmpl = `
  <div class="apos-guide-icon-meta">
    <p class="apos-guide-icon-name">${options.name}</p>
  </div>`;

  const meta = options.name ? nameTmpl : '';

  return `<div class="apos-guide-icon">
  <div class="apos-guide-icon-example">
    <img class="apos-guide-icon-image" src="${options.src}">
  </div>${meta}
</div>`;
};

module.exports = template;
