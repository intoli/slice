import assert from 'assert';

import SliceArray from '../src/';


describe('SliceArray', () => {
  it('should reverse an array', () => {
    const input = new SliceArray(1, 2, 3, 4);
    const expectedOutut = [4, 3, 2, 1];
    const output = input[[,,-1]];
    assert.deepStrictEqual(output, expectedOutut);
  });
});
