import assert from 'assert';

import { SliceString } from '../src/';


describe('SliceString', () => {
  it('should be identifiable using instanceof', () => {
    const sliceString = new SliceString();
    assert(sliceString instanceof SliceString);
  });

  it('should support initialization without the new keyword', () => {
    const sliceString = SliceString('hello');
    assert(sliceString == 'hello');
  });

  it('should return a slice string when slicing', () => {
    const original = SliceString('hello');
    const reversed = original[[,,-1]];
    assert(reversed instanceof SliceString);
    assert.deepStrictEqual(reversed[[,,-1]], original);
  });

  it('should reverse a string', () => {
    const input = new SliceString('hello');
    const expectedOutput = 'olleh';
    const output = input[[,,-1]];
    assert(output == expectedOutput);
  });

  it('should extract the even characters from a string', () => {
    const input = new SliceString('hello');
    const expectedOutput = 'hlo';
    const output = input[[,,2]];
    assert(output == expectedOutput);
  });

  it('should extract the odd elements from an array', () => {
    const input = new SliceString('hello');
    const expectedOutput = 'el';
    const output = input[[1,,2]];
    assert(output == expectedOutput);
  });
});
