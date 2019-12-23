const fs = require("fs");

const extractHeadLines = function(listOfLines, noOfLines = 10) {
  const listOfHeadLines = listOfLines.slice(0, noOfLines);
  return listOfHeadLines.join("\n");
};

const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return errorMessage;
};

const loadContentsFromFile = function(filePath, readFile) {
  const fileContents = readFile(filePath, "utf8");
  return fileContents.split("\n");
};

const readCommandLineArgs = function(commandLineArgs) {
  const filename = commandLineArgs[0];
  const headOptions = { filename };
  return headOptions;
};

const performHeadOperation = function(commandLineArgs, fsModules) {
  const userArgs = commandLineArgs.slice(2);
  const { readFile, existsFile } = fsModules;
  const { filename } = readCommandLineArgs(userArgs);

  if (!existsFile(filename)) {
    return generateErrorMessage(filename);
  }

  const listOfLines = loadContentsFromFile(filename, readFile);
  const headLines = extractHeadLines(listOfLines);
  return headLines;
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  readCommandLineArgs,
  performHeadOperation
};
