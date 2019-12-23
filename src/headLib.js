"use strict";
const fs = require("fs");

const extractHeadLines = function(listOfLines) {
  const listOfHeadLines = listOfLines.slice(0, 10);
  return listOfHeadLines.join("\n");
};

const generateErrorMessage = function(filename) {
  const errorMessage = `head: ${filename}: No such file or directory`;
  return { error: errorMessage };
};

const loadContentsFromFile = function(filePath, readFile) {
  const fileContents = readFile(filePath, "utf8");
  return fileContents.split("\n");
};

const parseUserArgs = function(userArgs) {
  const filename = userArgs[0];
  const headOptions = { filename };
  return headOptions;
};

const performHeadOperation = function(commandLineArgs, fsModules) {
  const userArgs = commandLineArgs.slice(2);
  const { readFile, existsFile } = fsModules;
  const { filename } = parseUserArgs(userArgs);

  if (!existsFile(filename)) {
    return generateErrorMessage(filename);
  }

  const listOfLines = loadContentsFromFile(filename, readFile);
  const headLines = extractHeadLines(listOfLines);
  return { headLines };
};

module.exports = {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  parseUserArgs,
  performHeadOperation
};
