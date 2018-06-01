import assert from 'assert';

import SliceArray from '../src/';


describe('SliceArray', () => {
  it('should reverse an array', () => {
    const input = new SliceArray(1, 2, 3, 4);
    const expectedOutput = [4, 3, 2, 1];
    const output = input[[,,-1]];
    assert.deepStrictEqual(output, expectedOutput);
  });

  it('should extract the even elements from an array', () => {
    const input = new SliceArray(0, 1, 2, 3, 4);
    const expectedOutput = [0, 2, 4];
    const output = input[[,,2]];
    assert.deepStrictEqual(output, expectedOutput);
  });

  it('should extract the odd elements from an array', () => {
    const input = new SliceArray(0, 1, 2, 3, 4);
    const expectedOutput = [1, 3];
    const output = input[[1,,2]];
    assert.deepStrictEqual(output, expectedOutput);
  });
});
