'use strict';
const {createReadStream} = require('fs');
const {stdin, stdout, stderr} = process;
const StreamPicker = require('./src/streamPicker');
const {performHeadOperation} = require('./src/headLib');

const displayResult = function (result) {
  stdout.write(result.headLines);
  stderr.write(result.error);
};

const main = function () {
  const [, , ...userArgs] = process.argv;
  const streamPicker = new StreamPicker(createReadStream, stdin);
  performHeadOperation(userArgs, streamPicker, displayResult);
};

main();
