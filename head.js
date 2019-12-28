'use strict';
const { readFileSync, existsSync } = require('fs');
const { stdout, stderr } = process;
const { performHeadOperation } = require('./src/headLib');

const main = function(cmdLineArgs) {
  const result = performHeadOperation(cmdLineArgs, readFileSync, existsSync);
  stdout.write(result.headLines);
  stderr.write(result.error);
};

main(process.argv);
