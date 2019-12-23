const fs = require("fs");
const { performHeadOperation } = require("./src/headLib");

const head = function(commandLineArgs) {
  const fsModules = { readFile: fs.readFileSync, existsFile: fs.existsSync };
  console.log(performHeadOperation(commandLineArgs, fsModules));
};

head(process.argv);
