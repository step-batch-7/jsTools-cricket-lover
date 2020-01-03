'use strict';
const EMPTY_STRING = '';

const extractHeadLines = function(lines) {
  const start = 0;
  const end = 10;
  const listOfHeadLines = lines.split('\n').slice(start, end);
  return listOfHeadLines.join('\n');
};

const generateErrorMessage = function(filename) {
  return `head: ${filename}: No such file or directory`;
};

const parseUserArgs = function(userArgs) {
  const [filename] = userArgs;
  return {filename};
};

const performHeadOperation = function(userArgs, readFile, onHeadComplete) {
  let result = EMPTY_STRING;
  const {filename} = parseUserArgs(userArgs);

  const onReadComplete = (err, content) => {
    if (err) {
      result = {headLines: EMPTY_STRING, error: generateErrorMessage(filename)};
    } else {
      result = {headLines: extractHeadLines(content), error: EMPTY_STRING};
    }
    onHeadComplete(result);
  };

  readFile(filename, 'utf8', onReadComplete);
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  parseUserArgs,
  performHeadOperation
};
