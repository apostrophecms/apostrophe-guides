const assert = require("assert");

const templates = require("../lib/templates");

describe("apostrophe-guides:templates", function() {

  it("should render a font demo", function(done) {
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

});
