const Fuse = require("fuse.js");
const sanitizeHtml = require("sanitize-html");

const { highlight } = require("./utils");

module.exports = (self, options) => {
  const docs = self.data.sections.map(({ docs }) => docs).flat();

  const pages = docs.map(item => {
    const text = sanitizeHtml(item.doc, {
      transformTags: {
        h1: (tagName, attribs) => {
          return {
            text: ""
          };
        }
      },
      allowedTags: [],
      allowedAttributes: []
    })
      .replace(/(\n)+/g, " ")
      .trim();

    return {
      ...item,
      doc: text
    };
  });

  const searchOptions = {
    includeScore: true,
    includeMatches: true,
    keys: ["name", "doc"]
  };

  const index = Fuse.createIndex(searchOptions.keys, pages);

  self.apos.app.post(`/${options.path}/search`, (req, res) => {
    const { query } = req.body;

    const collection = new Fuse(
      pages,
      {
        ...searchOptions,
        minMatchCharLength: query.length > 3 ? query.length : 3
      },
      index
    );

    const results = collection.search(query);

    // Find the total number of times the term was found in all the docs.
    const totalResults = results.reduce((total, result) => {
      result.matches.forEach(({ indices }) => (total += indices.length));
      return total;
    }, 0);

    const highlightedResults = results.map(result => {
      const { item } = result;

      const updatedResult = {};

      result.matches.forEach(({
        indices, value, key
      }) => {
        return (updatedResult[key] = highlight(indices, value));
      });

      return {
        name: item.name,
        url: item.url,
        doc: item.doc,
        ...updatedResult
      };
    });

    const data = {
      query,
      guide: self.data,
      totalResults,
      totalDocuments: highlightedResults.length,
      results: highlightedResults
    };

    return self.sendPage(req, self.renderer("search"), data);
  });
};
