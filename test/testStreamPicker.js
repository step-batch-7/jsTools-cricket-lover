const {assert} = require('chai');
const sinon = require('sinon');
const StreamPicker = require('../src/streamPicker');

describe('streamPicker', () => {
  describe('pick', () => {
    let createReadStream, stdin, streamPicker;
    beforeEach(() => {
      createReadStream = sinon.fake.returns({});
      stdin = {};
      streamPicker = new StreamPicker(createReadStream, stdin);
    });

    it('should create and pick createReadStream when filename is given', () => {
      assert.deepStrictEqual(streamPicker.pick('file1'), {});
    });
    it('should pick stdin when filename is not given', () => {
      assert.deepStrictEqual(streamPicker.pick(), stdin);
    });
  });
});
