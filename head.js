"use strict";
const fs = require("fs");
const { stdout, stderr } = require("process");
const { performHeadOperation } = require("./src/headLib");

const head = function(commandLineArgs) {
  const fsModules = { readFile: fs.readFileSync, existsFile: fs.existsSync };
  const result = performHeadOperation(commandLineArgs, fsModules);
  result.headLines && stdout.write(result.headLines);
  result.error && stderr.write(result.error);
};

head(process.argv);
