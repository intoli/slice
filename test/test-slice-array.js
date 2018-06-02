import assert from 'assert';

import { SliceArray, SliceString } from '../src/';


describe('SliceArray', () => {
  it('should return true for Array.isArray()', () => {
    const sliceArray = new SliceArray();
    assert(Array.isArray(sliceArray));
  });

  it('should be identifiable using instanceof', () => {
    const sliceArray = new SliceArray();
    assert(sliceArray instanceof SliceArray);
  });

  it('should support initialization without the new keyword', () => {
    const sliceArray = SliceArray(1, 2, 3);
    assert(sliceArray.length === 3);
    assert(sliceArray[-1] === 3);
  });

  it('should support initialization with SliceArray.from()', () => {
    const sliceArray = SliceArray.from([1, 2]);
    assert(sliceArray.length === 2);
  });

  it('should handle negative index use of the in keyword', () => {
    const sliceArray = SliceArray(0, 1, 2, 3);
    delete sliceArray[[,,2]];
    assert(-1 in sliceArray);
    assert(!(-2 in sliceArray));
    assert(-3 in sliceArray);
    assert(1 in sliceArray);
  });

  it('should handle slice use of the in keyword', () => {
    const sliceArray = SliceArray(0, 1, 2, 3);
    delete sliceArray[[,,2]];
    assert([1,,2] in sliceArray);
    assert(!([,,2] in sliceArray));
    assert(!([,2] in sliceArray));
    assert([1,2] in sliceArray);
  });

  it('should handle negative index deletion', () => {
    const sliceArray = SliceArray(0, 1, 2, 3);
    delete sliceArray[-1];
    const array = Array(0, 1, 2, 3);
    delete array[3];
    assert.deepEqual(sliceArray, array);
  });

  it('should handle slice deletion', () => {
    const sliceArray = SliceArray(0, 1, 2, 3);
    delete sliceArray[[,,2]];
    const array = Array(0, 1, 2, 3);
    delete array[0];
    delete array[2];
    assert.deepEqual(sliceArray, array);
  });

  it('should return a slice array when using map()', () => {
    const mapped = SliceArray(0, 1, 2, 3).map(i => 2 * i);
    assert(mapped[-1] === 6);
  });

  it('should return a slice array when using slice()', () => {
    const sliced = SliceArray(0, 1, 2, 3).slice(-2);
    assert.deepEqual(sliced[[,,-1]], [3, 2]);
  });

  it('should return a slice array when slicing', () => {
    const sliceArray = SliceArray(0, 1, 2, 3)
    const reversedArray = sliceArray[[,,-1]];
    assert(reversedArray instanceof SliceArray);
    assert.deepStrictEqual(reversedArray[[,,-1]], sliceArray);
  });

  it('should reverse an array', () => {
    const input = new SliceArray(1, 2, 3, 4);
    const expectedOutput = [4, 3, 2, 1];
    const output = input[[,,-1]];
    assert.deepEqual(output, expectedOutput);
  });

  it('should extract the even elements from an array', () => {
    const input = new SliceArray(0, 1, 2, 3, 4);
    const expectedOutput = [0, 2, 4];
    const output = input[[,,2]];
    assert.deepEqual(output, expectedOutput);
  });

  it('should extract the odd elements from an array', () => {
    const input = new SliceArray(0, 1, 2, 3, 4);
    const expectedOutput = [1, 3];
    const output = input[[1,,2]];
    assert.deepEqual(output, expectedOutput);
  });

  it('should support slice assignment from a String', () => {
    const array = new SliceArray(1, 2, 3, 4);
    const expectedOutput = [1, 'b', 3, 'a'];
    array[[,,-2]] = 'ab';
    assert.deepEqual(array, expectedOutput);
  });

  it('should support slice assignment from a SliceString', () => {
    const array = new SliceArray(1, 2, 3, 4);
    const expectedOutput = [1, 'b', 3, 'a'];
    array[[,,-2]] = new SliceString('ab');
    assert.deepEqual(array, expectedOutput);
  });
});
