const extractHeadLines = function(listOfLines) {
  const listOfHeadLines = listOfLines.slice(0, 10);
  return listOfHeadLines.join("\n");
};

module.exports = { extractHeadLines };
