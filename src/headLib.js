'use strict';
const EMPTY_STRING = '';

const extractHeadLines = function(lines, numOfLines) {
  const start = 0;
  const end = numOfLines;
  const listOfHeadLines = lines.split('\n').slice(start, end);
  return listOfHeadLines.join('\n');
};

const generateErrorMessage = function(filename) {
  return `head: ${filename}: No such file or directory`;
};

const parseUserArgs = function(userArgs) {
  const defaultNumOfLines = 10;
  const [firstOption] = userArgs;
  const options = {filename: firstOption, numOfLines: defaultNumOfLines};
  if(/^-n/.test(firstOption)){
    [, options.numOfLines, options.filename] = userArgs;
  }
  return options;
};

const loadContents = function(readStream, onLoadComplete) {
  readStream.setEncoding('utf8');
  readStream.on('data', content => {
    onLoadComplete(null, content);
  });
  readStream.on('error', error => onLoadComplete(error, null));
};

const performHeadOperation = function(userArgs, streamPicker, onHeadComplete) {
  let result = EMPTY_STRING;
  const {filename, numOfLines} = parseUserArgs(userArgs);
  const readStream = streamPicker.pick(filename);

  const onReadComplete = (error, content) => {
    if (!error) {
      result = {
        headLines: extractHeadLines(content, numOfLines), 
        error: EMPTY_STRING
      };
    } else {
			
      result = {
        headLines: EMPTY_STRING,
        error: generateErrorMessage(filename)
      };
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
