import assert from 'assert';

import { range } from '../src';


describe('range', () => {
  it('should construct a range starting at zero', () => {
    assert.deepStrictEqual(range(4), [0, 1, 2, 3]);
  });

  it('should construct a range starting above zero', () => {
    assert.deepStrictEqual(range(1, 4), [1, 2, 3]);
  });

  it('should construct a range below zero', () => {
    assert.deepStrictEqual(range(-4, 0), [-4, -3, -2, -1]);
  });

  it('should handle a positive step parameter', () => {
    assert.deepStrictEqual(range(1, 4, 2), [1, 3]);
  });

  it('should handle a negative step parameter', () => {
    assert.deepStrictEqual(range(8, 2, -3), [8, 5]);
  });
});
