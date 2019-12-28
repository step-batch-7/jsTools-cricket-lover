'use strict';
const extractHeadLines = function(listOfLines) {
  const start = 0;
  const end = 10;
  const listOfHeadLines = listOfLines.slice(start, end);
  return listOfHeadLines.join('\n');
};

const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return { error: errorMessage, headLines: '' };
};

const loadContentsFromFile = function(filePath, readFileSync) {
  return readFileSync(filePath, 'utf8').split('\n');
};

const parseUserArgs = function(userArgs) {
  const [filename] = userArgs;
  return { filename };
};

const performHeadOperation = function(cmdLineArgs, readFileSync, existsSync) {
  const [, , ...userArgs] = cmdLineArgs;
  const error = ''; 
  const { filename } = parseUserArgs(userArgs);
  if (!existsSync(filename)) {
    return generateErrorMessage(filename);
  }
  const listOfLines = loadContentsFromFile(filename, readFileSync);
  return { headLines: extractHeadLines(listOfLines), error };
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  parseUserArgs,
  performHeadOperation
};
