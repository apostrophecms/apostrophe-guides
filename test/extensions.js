const assert = require("assert");

const extensions = require('../lib/extensions');

describe("apostrophe-guides:extensions", function() {
  it("should convert a font tag to html", function(done) {
    const md = `[font family="Helvetica"]`;

    const expected = `<div class="apos-guide-font">
  <div class="apos-guide-font-example" style="font-family: Helvetica;">Helvetica</div>
  <div class="apos-guide-font-meta">
    <p class="apos-guide-font-name">Helvetica</p>
  </div>
</div>`;

    const actual = extensions.findFonts(md);

    assert.equal(expected, actual);
    done();
  });

  it("should convert a icon tag to html", function(done) {
    const md = `[icon name="foo" src="/images/foo.svg"]`;

    const expected = `<div class="apos-guide-icon">
  <div class="apos-guide-icon-example">
    <img class="apos-guide-icon-image" src="/images/foo.svg">
  </div>
  <div class="apos-guide-icon-meta">
    <p class="apos-guide-icon-name">foo</p>
  </div>
</div>`;

    const actual = extensions.findIcons(md);

    assert.equal(expected, actual);
    done();
  });

  it("should convert a swatch tag to html", function(done) {
    const md = `[swatch name="red" hex="#F00"]`;

    const expected = `<div class="apos-guide-swatch">
  <div class="apos-guide-swatch-color" style="background-color: #F00"></div>
  <div class="apos-guide-swatch-meta">
    <p class="apos-guide-swatch-name">red</p>
    <span class="apos-guide-swatch-hex">#F00</span>
    <span class="apos-guide-swatch-rgb">rgb(255,0,0)</span>
  </div>
</div>`;

    const actual = extensions.findSwatches(md);

    assert.equal(expected, actual);
    done();
  });

  it("should convert a rgb to hex", function(done) {
    const md = `[swatch name="red" rgb="rgb(255,0,0)"]`;

    const expected = `<div class="apos-guide-swatch">
  <div class="apos-guide-swatch-color" style="background-color: #FF0000"></div>
  <div class="apos-guide-swatch-meta">
    <p class="apos-guide-swatch-name">red</p>
    <span class="apos-guide-swatch-hex">#FF0000</span>
    <span class="apos-guide-swatch-rgb">rgb(255,0,0)</span>
  </div>
</div>`;

    const actual = extensions.findSwatches(md);

    assert.equal(expected, actual);
    done();
  });

  it("should just return the string if no custom tags are found", function(done) {
    const md = `font icon swatch foo bar baz`;

    const expected = `font icon swatch foo bar baz`;

    let actual = extensions.findFonts(md);
    actual = extensions.findIcons(actual);
    actual = extensions.findSwatches(actual);

    assert.equal(expected, actual);
    done();
  });

});
