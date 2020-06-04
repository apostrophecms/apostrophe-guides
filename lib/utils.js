const stringify = str => JSON.stringify(str, null, 4);

const logError = string => {
  console.error(`Error: 'apostrophe-guides' \n${string}\n`);
};

module.exports = {
  logError,
  stringify
};
