const extractHeadLines = function(listOfLines) {
  const listOfHeadLines = listOfLines.slice(0, 10);
  return listOfHeadLines.join("\n");
};
const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return errorMessage;
};

module.exports = {
  extractHeadLines,
  generateErrorMessage
};
