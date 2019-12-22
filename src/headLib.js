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

const readCommandLineArgs = function(commandLineArgs) {
  const filename = commandLineArgs[2];
  const headOptions = { filename };
  return headOptions;
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  readCommandLineArgs
};
