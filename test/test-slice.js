import assert from 'assert';

import { slice, Slice } from '../src/';


describe('Slice', () => {
  it('should not require the new keyword for the slice(start, stop, step) syntax', () => {
    const testSlice = slice(1, 2, 3);
    assert(testSlice.start === 1);
    assert(testSlice.stop === 2);
    assert(testSlice.step === 3);
  });

  it('should handle the Slice(start, stop, step) constructor syntax', () => {
    const testSlice = new Slice(1, 2, 3);
    assert(testSlice.start === 1);
    assert(testSlice.stop === 2);
    assert(testSlice.step === 3);
  });

  it('should handle the Slice(stop) constructor syntax', () => {
    const testSlice = new Slice(1);
    assert(testSlice.start == null);
    assert(testSlice.stop === 1);
  });

  it('should convert to a string properly as an object key', () => {
    const testSlice = new Slice(1, 2, 3);
    const dictionary = {};
    dictionary[testSlice] = true;
    assert(dictionary['Slice(1, 2, 3)'])
  });

  it('should recreate a stringified Slice with Slice.from()', () => {
    const beforeSlice = new Slice(1, null, 3);
    const afterSlice = Slice.from(beforeSlice.toString());
    assert(beforeSlice.start === afterSlice.start);
    assert(beforeSlice.stop === afterSlice.stop);
    assert(beforeSlice.step === afterSlice.step);
  });
});
