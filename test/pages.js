const assert = require('assert');

const pages = require('../lib/pages');

describe('apostrophe-guides:pages', function() {
  let apos;

  let options = {};

  this.timeout(20000);

  after(function(done) {
    require('apostrophe/test-lib/util').destroy(apos, done);
  });

  it('initializes', function(done) {
    options = {
      path: 'guide',
      sections: [
        {
          name: 'Overview',
          docs: [`${__dirname}/docs/README.md`]
        }
      ]
    };

    apos = require('apostrophe')({
      testModule: true,
      modules: {
        'apostrophe-express': {
          secret: 'xxx',
          port: 7900
        },
        'apostrophe-guides': options
      },
      afterInit: function(callback) {
        return callback(null);
      },
      afterListen: function(err) {
        assert(!err);
        done();
      }
    });
  });

  it('creates page data', function(done) {
    const expected = [
      {
        docs: [
          {
            demos: null,
            name: 'README',
            url: '/guide/overview/readme',
            doc:
              '<h1 id="readme" class="apos-guide-heading">\n' +
              '  <a class="apos-guide-heading-link" href="#readme">Readme</a>\n' +
              '</h1>'
          }
        ],
        name: 'Overview'
      }
    ];

    const actual = pages(apos, options);
    assert.deepEqual(expected, actual);
    done();
  });

  it('creates page data from a glob', function(done) {
    options = {
      path: 'guide',
      sections: [
        {
          name: 'Overview',
          docs: [`${__dirname}/docs/*`]
        }
      ]
    };

    apos.modules['apostrophe-guides'] = options;

    const expected = [
      {
        docs: [
          {
            demos: null,
            name: 'README',
            url: '/guide/overview/readme',
            doc:
              '<h1 id="readme" class="apos-guide-heading">\n' +
              '  <a class="apos-guide-heading-link" href="#readme">Readme</a>\n' +
              '</h1>'
          }
        ],
        name: 'Overview'
      }
    ];

    const actual = pages(apos, options);
    assert.deepEqual(expected, actual);
    done();
  });
});
