const extractHeadLines = function(listOfLines) {
  const listOfHeadLines = listOfLines.slice(0, 10);
  return listOfHeadLines.join("\n");
};
const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return errorMessage;
};

const loadContentsFromFile = function(filePath, fileReader) {
  const fileContents = fileReader("utf8", filePath);
  return fileContents.split("\n");
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile
};
