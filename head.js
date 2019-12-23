"use strict";
const fs = require("fs");
const { stdout } = require("process");
const { performHeadOperation } = require("./src/headLib");

const head = function(commandLineArgs) {
  const fsModules = { readFile: fs.readFileSync, existsFile: fs.existsSync };
  stdout.write(performHeadOperation(commandLineArgs, fsModules));
};

head(process.argv);
