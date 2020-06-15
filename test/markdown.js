const assert = require("assert");

const utils = require("../lib/markdown");

describe("apostrophe-guides:markdown", function() {
  it("should render markdown", function(done) {
    const expected = `<h1 id="title" class="apos-guide-heading">
  <a class="apos-guide-heading-link" href="#title">Title</a>
</h1>`;

    const md = "# Title";
    const actual = utils.renderDoc(md);

    assert.equal(expected, actual);
    done();
  });
});
