import assert from 'assert';

import { range } from '../src';


describe('range', () => {
  it('should construct a range starting at zero', () => {
    assert.deepEqual(range(4), [0, 1, 2, 3]);
  });

  it('should construct a range starting above zero', () => {
    assert.deepEqual(range(1, 4), [1, 2, 3]);
  });

  it('should construct a range below zero', () => {
    assert.deepEqual(range(-4, 0), [-4, -3, -2, -1]);
  });

  it('should handle a positive step parameter', () => {
    assert.deepEqual(range(1, 4, 2), [1, 3]);
  });

  it('should handle a negative step parameter', () => {
    assert.deepEqual(range(8, 2, -3), [8, 5]);
  });

  it('should return a SliceArray', () => {
    assert.deepEqual(range(5)[[,,2]], [0, 2, 4]);
    assert.deepEqual(range(5, 0, -1)[[,,-1]], range(1, 6));
  });
});
