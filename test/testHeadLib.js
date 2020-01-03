'use strict';
const assert = require('chai').assert;
const {
  extractHeadLines,
  generateErrorMessage,
  parseUserArgs,
  performHeadOperation
} = require('../src/headLib');

describe('defaultBehaviour', () => {
  describe('extractHeadLines', () => {
    it('should extract 10 head lines from the given list of lines', () => {
      const listOfLines = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\na\nb\nc\nd';
      const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it('should extract all lines when number of lines are less than 10', () => {
      const listOfLines = '1\n2\n3\n4';
      const expected = '1\n2\n3\n4';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it('should give empty string when file is empty', () => {
      const listOfLines = '';
      const expected = '';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('generateErrorMessage', () => {
    it('should generate the error message with the given file name', () => {
      const filename = 'a.txt';
      const expected = 'head: a.txt: No such file or directory';
      const actual = generateErrorMessage(filename);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('parseUserArgs', () => {
    it('should read the arguments from the given file', () => {
      const userArgs = ['a.txt'];
      const expected = {filename: 'a.txt'};
      const actual = parseUserArgs(userArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('performHeadOperation', () => {
    it('should give all the lines when file has less than 10 lines', (done) => {
      const readFile = (filePath, encoding, callback) => {
        assert.strictEqual(filePath, 'one.txt');
        assert.strictEqual(encoding, 'utf8');
        setTimeout(() => callback(null, '1\n2\n3'), 0);
      };
      const displayResult = ({error, headLines}) => {
        assert.strictEqual(headLines, '1\n2\n3');
        assert.strictEqual(error, '');
        done();
      };
      performHeadOperation(['one.txt'], readFile, displayResult);
    });
    it('should give 10 lines when file has 10 or more lines', (done) => {
      const readFile = (filePath, encoding, callback) => {
        assert.strictEqual(filePath, 'one.txt');
        assert.strictEqual(encoding, 'utf8');
        setTimeout(
          () => callback(null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13'),
          0
        );
      };
      const displayResult = ({error, headLines}) => {
        assert.strictEqual(headLines, '1\n2\n3\n4\n5\n6\n7\n8\n9\n0');
        assert.strictEqual(error, '');
        done();
      };
      performHeadOperation(['one.txt'], readFile, displayResult);
    });
    it('should give 10 lines when file has 10 or more lines', (done) => {
      const readFile = (filePath, encoding, callback) => {
        assert.strictEqual(filePath, 'one.txt');
        assert.strictEqual(encoding, 'utf8');
        setTimeout(() => callback('error', null), 0);
      };
      const displayResult = ({error, headLines}) => {
        assert.strictEqual(headLines, '');
        assert.strictEqual(error, 'head: one.txt: No such file or directory');
        done();
      };
      performHeadOperation(['one.txt'], readFile, displayResult);
    });
  });
});
