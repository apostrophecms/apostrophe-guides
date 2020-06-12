const assert = require("assert");

const templates = require("../lib/templates");

describe("apostrophe-guides:templates", function() {

  it("should render a font", function(done) {
    const expected = `<div class="apos-guide-font">
  <div class="apos-guide-font-example" style="font-family: Helvetica, san-serif;font-weight: bold;">Aa</div>
  <div class="apos-guide-font-meta">
    <p class="apos-guide-font-name">Helvetica Bold</p>
  </div>
</div>`;

    const options = {
      name: "Helvetica",
      family: "Helvetica, san-serif",
      weight: "bold",
      text: "Aa"
    };

    const actual = templates.font(options);

    assert.equal(expected, actual);
    done();
  });

  it("should render a icon", function(done) {

    const expected = `<div class="apos-guide-icon">
  <div class="apos-guide-icon-example">
    <img class="apos-guide-icon-image" src="/images/cart.svg">
  </div>
  <div class="apos-guide-icon-meta">
    <p class="apos-guide-icon-name">Cart</p>
  </div>
</div>`;

    const options = {
      name: "Cart",
      src: "/images/cart.svg"
    };

    const actual = templates.icon(options);

    assert.equal(expected, actual);
    done();
  });

  it("should render a swatch", function(done) {

    const expected = `<div class="apos-guide-swatch">
  <div class="apos-guide-swatch-color" style="background-color: #F00"></div>
  <div class="apos-guide-swatch-meta">
    <p class="apos-guide-swatch-name">$red</p>
    <span class="apos-guide-swatch-hex">#F00</span>
    <span class="apos-guide-swatch-rgb">rgb(221,238,255)</span>
  </div>
</div>`;

    const options = {
      name: "$red",
      hex: "#F00",
      rgb: "rgb(221,238,255)"
    };

    const actual = templates.swatch(options);

    assert.equal(expected, actual);
    done();
  });

});
