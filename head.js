"use strict";
const { readFileSync, existsSync } = require("fs");
const { stdout, stderr } = require("process");
const { performHeadOperation } = require("./src/headLib");

const head = function(commandLineArgs) {
  const fsModules = { readFileSync, existsSync };
  const result = performHeadOperation(commandLineArgs, fsModules);
  stdout.write(result.headLines);
  stderr.write(result.error);
};

head(process.argv);
