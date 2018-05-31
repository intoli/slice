import assert from 'assert';

import range from '../src/range'


describe('range', () => {
  it('should construct a range starting at zero', () => {
    assert.deepStrictEqual(range(4), [0, 1, 2, 3]);
  });

  it('should construct a range starting above zero', () => {
    assert.deepStrictEqual(range(1, 4), [1, 2, 3]);
  });
});
