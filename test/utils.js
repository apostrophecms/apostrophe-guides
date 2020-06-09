const sinon = require("sinon");
const assert = require("assert");

const utils = require("../lib/utils");

describe("apostrophe-guides:utils", function() {
  it("should stringify with formatting", function(done) {
    const obj = { foo: "bar" };

    const expected = `{
    "foo": "bar"
}`;

    const actual = utils.stringify(obj);

    assert.equal(expected, actual);
    done();
  });

  it("should highlight a term", function(done) {
    const str = "Hello World";

    const expected = `<span class="apos-text-highlight">Hell</span>o World`;
    const actual = utils.highlight([[0, 3]], str);

    assert.equal(expected, actual);
    done();
  });

  it("should log an error", function(done) {
    const spy = sinon.spy(console, "error");

    const expected = `Error: 'apostrophe-guides' \nfoo\n`;

    utils.logError("foo");

    assert(spy.calledWith(expected));
    spy.restore();
    done();
  });

  it("should render markdown", function(done) {
    const expected = '<h1 id="title">Title</h1>\n';

    const md = "# Title";
    const actual = utils.renderDoc(md);

    assert.equal(expected, actual);
    done();
  });

  it("should set a section to active", function(done) {
    const sections = [
      {
        name: "Section",
        docs: [{ name: "Page One" }, { name: "Page Two" }]
      }
    ];

    const page = { name: "Page One" };

    const expected = [
      {
        name: "Section",
        docs: [
          {
            name: "Page One",
            active: true
          },
          {
            name: "Page Two",
            active: false
          }
        ]
      }
    ];

    const actual = utils.setActive(sections, page);

    assert.deepEqual(expected, actual);
    done();
  });
});
