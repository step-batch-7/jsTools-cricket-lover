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

const loadContents = function(readStream, onLoadComplete) {
  readStream.setEncoding('utf8');
  readStream.on('data', (content) => onLoadComplete(null, content));
  readStream.on('error', (error) => onLoadComplete(error, null));
};

const performHeadOperation = function(userArgs, streamPicker, onHeadComplete) {
  let result = EMPTY_STRING;
  const {filename} = parseUserArgs(userArgs);
  const readStream = streamPicker.pick(filename);

  const onReadComplete = (error, content) => {
    if (!error) {
      result = {headLines: extractHeadLines(content), error: EMPTY_STRING};
    } else {
      result = {headLines: EMPTY_STRING, error: generateErrorMessage(filename)};
    }
    onHeadComplete(result);
  };

  loadContents(readStream, onReadComplete);
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  parseUserArgs,
  performHeadOperation
};
