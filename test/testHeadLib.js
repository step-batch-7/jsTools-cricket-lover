'use strict';
const assert = require('chai').assert;
const {
  extractHeadLines,
  generateErrorMessage,
  loadContentsFromFile,
  parseUserArgs,
  performHeadOperation
} = require('../src/headLib');

describe('defaultFlow', () => {
  describe('extractHeadLines', () => {
    it('should extract 10 head lines from the given list of lines', () =>  {
      const listOfLines = '1234567890abcd'.split('');
      const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it('should extract all lines when number of lines are less than 10', () => {
      const listOfLines = '1234'.split('');
      const expected = '1\n2\n3\n4';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
    it('should give empty string when file is empty', () => {
      const listOfLines = ''.split('');
      const expected = '';
      const actual = extractHeadLines(listOfLines);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('generateErrorMessage', () => {
    it('should generate the error message with the given file name', () => {
      const filename = 'a.txt';
      const expected = {
        error: 'head: a.txt: No such file or directory',
        headLines: ''
      };
      const actual = generateErrorMessage(filename);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('loadContentsFromFile', () => {
    it('should load contents from the given file', () => {
      const filePath = 'a.txt';
      const fileReader = function(filePath, encoding) {
        assert.strictEqual(filePath, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        const fileData = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15';
        return fileData;
      };
      const expected = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '11',
        '12',
        '13',
        '14',
        '15'
      ];
      const actual = loadContentsFromFile(filePath, fileReader);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('parseUserArgs', () => {
    it('should read the arguments from the given file', () => {
      const userArgs = ['a.txt'];
      const expected = { filename: 'a.txt' };
      const actual = parseUserArgs(userArgs);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('performHeadOperation', () => {
    it('should give headLines when file has 10 or more lines', () => {
      const commandLineArgs = ['node', 'head.js', 'a.txt'];
      const readFileSync = function(filePath, encoding) {
        assert.strictEqual(filePath, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        const fileData = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15';
        return fileData;
      };
      const existsSync = function(filePath) {
        assert.strictEqual(filePath, 'a.txt');
        return true;
      };
      const expected = { headLines: '1\n2\n3\n4\n5\n6\n7\n8\n9\n0', error: '' };
      const actual = performHeadOperation(
        commandLineArgs,
        readFileSync,
        existsSync
      );
      assert.deepStrictEqual(actual, expected);
    });
    it('should give head lines when file has less than 10 lines', () => {
      const commandLineArgs = ['node', 'head.js', 'a.txt'];
      const readFileSync = function(filePath, encoding) {
        assert.strictEqual(filePath, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        const fileData = '1\n2\n3\n4';
        return fileData;
      };
      const existsSync = function(filePath) {
        assert.strictEqual(filePath, 'a.txt');
        return true;
      };
      const expected = { headLines: '1\n2\n3\n4', error: '' };
      const actual = performHeadOperation(
        commandLineArgs,
        readFileSync,
        existsSync
      );
      assert.deepStrictEqual(actual, expected);
    });
    it('should show error message when file is not present', () => {
      const commandLineArgs = ['node', 'head.js', 'a.txt'];
      const readFileSync = function(filePath, encoding) {
        assert.strictEqual(filePath, 'a.txt');
        assert.strictEqual(encoding, 'utf8');
        const fileData = '1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n11\n12\n13\n14\n15';
        return fileData;
      };
      const existsSync = function(filePath) {
        assert.strictEqual(filePath, 'a.txt');
        return false;
      };
      const expected = {
        error: 'head: a.txt: No such file or directory',
        headLines: ''
      };
      const actual = performHeadOperation(
        commandLineArgs,
        readFileSync,
        existsSync
      );
      assert.deepStrictEqual(actual, expected);
    });
  });
});
