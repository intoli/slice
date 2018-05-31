import assert from 'assert';

import { Slice } from '../src/';


describe('Slice', () => {
  it('should handle the Slice(start, stop, step) constructor syntax', () => {
    const slice = new Slice(1, 2, 3);
    assert(slice.start === 1);
    assert(slice.stop === 2);
    assert(slice.step === 3);
  });

  it('should handle the Slice(stop) constructor syntax', () => {
    const slice = new Slice(1);
    assert(slice.start == null);
    assert(slice.stop === 1);
  });
});
