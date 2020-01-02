'use strict';
const { readFile } = require('fs');
const { stdout, stderr } = process;
const { performHeadOperation } = require('./src/headLib');

const displayResult = function(result) {
  stdout.write(result.headLines);
  stderr.write(result.error);
};

const main = function() {
  const [, , ...userArgs] = process.argv;
  performHeadOperation(userArgs, readFile, displayResult);
};

main();
