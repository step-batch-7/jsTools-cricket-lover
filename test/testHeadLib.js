const assert = require("chai").assert;
const extractHeadLines = require("../src/headLib").extractHeadLines;

describe("defaultFlow", function() {
  describe("extractHeadLines", function() {
    it("should extract the 10 head lines from the given list of lines", function() {
      const listOfLines = "1234567890abcd".split("");

      const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n0";
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
  });
});
