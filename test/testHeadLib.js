"use strict";
const assert = require("chai").assert;
const {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  parseUserArgs,
  performHeadOperation
} = require("../src/headLib");

describe("defaultFlow", function() {
  describe("extractHeadLines", function() {
    it("should extract the 10 head lines from the given list of lines", function() {
      const listOfLines = "1234567890abcd".split("");
      const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n";
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it("should extract the total lines when number of lines present are less than 10", function() {
      const listOfLines = "1234".split("");
      const expected = "1\n2\n3\n4\n";
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it("should give empty string when file is empty", function() {
      const listOfLines = "".split("");
      const expected = "";
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("generateErrorMessage", function() {
    it("should generate the error message with the given file name", function() {
      const filename = "a.txt";
      const expected = `head: a.txt: No such file or directory\n`;
      const actual = generateErrorMessage(filename);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("loadContentsFromFile", function() {
    it("should load contents from the given file", function() {
      const filePath = "a.txt";
      const encoding = "utf8";
      const fileReader = function(filePath, encoding) {
        assert.strictEqual(filePath, "a.txt");
        assert.strictEqual(encoding, "utf8");
        const fileData = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15";
        return fileData;
      };
      const expected = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "11",
        "12",
        "13",
        "14",
        "15"
      ];
      const actual = loadContentsFromFile(filePath, fileReader);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("parseUserArgs", function() {
    it("should read the arguments from the given file", function() {
      const userArgs = ["a.txt"];
      const expected = { filename: "a.txt" };
      const actual = parseUserArgs(userArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("performHeadOperation", function() {
    it("should perform the head operation and give head lines on the given command line arguments when file is present", function() {
      const commandLineArgs = ["node", "head.js", "a.txt"];
      const readFile = function(filePath, encoding) {
        assert.strictEqual(filePath, "a.txt");
        assert.strictEqual(encoding, "utf8");
        const fileData = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15";
        return fileData;
      };
      const existsFile = function(filePath) {
        assert.strictEqual(filePath, "a.txt");
        return true;
      };
      const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n";
      const actual = performHeadOperation(commandLineArgs, {
        readFile,
        existsFile
      });
      assert.strictEqual(actual, expected);
    });
    it("should perform the head operation and give head lines on the given command line arguments when file is present", function() {
      const commandLineArgs = ["node", "head.js", "a.txt"];
      const readFile = function(filePath, encoding) {
        assert.strictEqual(filePath, "a.txt");
        assert.strictEqual(encoding, "utf8");
        const fileData = "1\n2\n3\n4";
        return fileData;
      };
      const existsFile = function(filePath) {
        assert.strictEqual(filePath, "a.txt");
        return true;
      };
      const expected = "1\n2\n3\n4\n";
      const actual = performHeadOperation(commandLineArgs, {
        readFile,
        existsFile
      });
      assert.strictEqual(actual, expected);
    });
    it("should perform the head operation and show error message on the given command line arguments when file is not present", function() {
      const commandLineArgs = ["node", "head.js", "a.txt"];
      const readFile = function(filePath, encoding) {
        assert.strictEqual(filePath, "a.txt");
        assert.strictEqual(encoding, "utf8");
        const fileData = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15";
        return fileData;
      };
      const existsFile = function(filePath) {
        assert.strictEqual(filePath, "a.txt");
        return false;
      };
      const expected = `head: a.txt: No such file or directory\n`;
      const actual = performHeadOperation(commandLineArgs, {
        readFile,
        existsFile
      });
      assert.strictEqual(actual, expected);
    });
  });
});
