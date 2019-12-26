"use strict";
const { readFileSync, existsSync } = require("fs");
const { stdout, stderr } = require("process");
const { performHeadOperation } = require("./src/headLib");

const head = function(cmdLineArgs) {
  const result = performHeadOperation(cmdLineArgs, readFileSync, existsSync);
  stdout.write(result.headLines);
  stderr.write(result.error);
};

head(process.argv);
