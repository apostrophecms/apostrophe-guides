const template = options => `<div class="apos-guide-swatch">
  <div class="apos-guide-swatch-color" style="background-color: ${options.hex}"></div>
  <div class="apos-guide-swatch-meta">
    <p class="apos-guide-swatch-name">${options.name}</p>
    <span class="apos-guide-swatch-hex">${options.hex}</span>
    <span class="apos-guide-swatch-rgb">${options.rgb}</span>
  </div>
</div>`;

module.exports = template;
