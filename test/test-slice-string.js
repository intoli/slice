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

  it('should return a slice string when using concat()', () => {
    const original = SliceString('hello');
    const concatenated = original.concat(' ', 'world');
    assert(concatenated instanceof SliceString);
    assert(concatenated == 'hello world');
  });

  it('should return an array of slice strings when using match()', () => {
    const original = SliceString('hello 3423');
    const match = original.match(/(hello )(\d+)/);
    assert(match.length === 3);
    match.forEach((group) => {
      assert(group instanceof SliceString);
    });
  });

  it('should return a slice string when using substr()', () => {
    const original = SliceString('hello');
    const extracted = original.substr(2, 2);
    assert(extracted instanceof SliceString);
    assert(extracted == 'll');
  });

  it('should return a slice string when using toUpperCase()', () => {
    const original = SliceString('hello');
    const upperCase = original.toUpperCase();
    assert(upperCase instanceof SliceString);
    assert(upperCase == 'HELLO');
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
