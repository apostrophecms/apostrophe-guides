const sinon = require("sinon");
const assert = require("assert");

const utils = require("../lib/utils");

describe("apostrophe-guides:utils", function() {
  it("should stringify", function(done) {
    const obj = { foo: "bar" };

    const expected = `{
    "foo": "bar"
}`;

    const actual = utils.stringify(obj);

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
});
