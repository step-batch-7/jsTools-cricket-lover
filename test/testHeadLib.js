const assert = require("chai").assert;
const { extractHeadLines, generateErrorMessage } = require("../src/headLib");

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
});
