"use strict";
const extractHeadLines = function(listOfLines) {
  const listOfHeadLines = listOfLines.slice(0, 10);
  return listOfHeadLines.join("\n");
};

const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return { error: errorMessage, headLines: "" };
};

const loadContentsFromFile = function(filePath, readFileSync) {
  return readFileSync(filePath, "utf8").split("\n");
};

const parseUserArgs = function(userArgs) {
  const filename = userArgs[0];
  return { filename };
};

const performHeadOperation = function(commandLineArgs, fsModules) {
  const userArgs = commandLineArgs.slice(2);
  const { readFileSync, existsSync } = fsModules;
  let error = "";
  const { filename } = parseUserArgs(userArgs);
  if (!existsSync(filename)) {
    return generateErrorMessage(filename);
  }
  const listOfLines = loadContentsFromFile(filename, readFileSync);
  return { headLines: extractHeadLines(listOfLines), error };
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  parseUserArgs,
  performHeadOperation
};
