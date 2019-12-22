const assert = require("chai").assert;
const {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  readCommandLineArgs
} = require("../src/headLib");

describe("defaultFlow", function() {
  describe("extractHeadLines", function() {
    it("should extract the 10 head lines from the given list of lines", function() {
      const listOfLines = "1234567890abcd".split("");
      const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0";
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("generateErrorMessage", function() {
    it("should generate the error message with the given file name", function() {
      const filename = "a.txt";
      const expected = "head: a.txt: No such file or directory";
      const actual = generateErrorMessage(filename);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("loadContentsFromFile", function() {
    it("should load contents from the given file", function() {
      const filePath = "a.txt";
      const encoding = "utf8";
      const fileReader = function(encoding, filePath) {
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
  describe("readCommandLineArgs", function() {
    it("should read the arguments from the given file", function() {
      const commandLineArgs = ["node", "head.js", "a.txt"];
      const expected = { filename: "a.txt" };
      const actual = readCommandLineArgs(commandLineArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
