class Slice {
  constructor(start, stop, step) {
    // Support the `Slice(stop)` signature.
    if (stop === undefined && step === undefined) {
      // eslint-disable-next-line no-param-reassign
      [start, stop] = [stop, start];
    }

    // Support numerical strings.
    this.start = start == null ? start : parseInt(start, 10);
    this.stop = stop == null ? stop : parseInt(stop, 10);
    this.step = step == null ? step : parseInt(step, 10);
  }

  static from = (string) => {
    const cleanedString = (string || '').toString()
      // Remove all whitespace.
      .replace(/\s/g, '')
      // Replace colons with commas.
      .replace(/:/g, ',');

    // Handle actual `Slice` objects.
    const sliceMatch = cleanedString.match(/^slice\((null|-?\d+),(null|-?\d+),(null|-?\d+)\)$/i);
    if (sliceMatch) {
      const [start, stop, step] = sliceMatch.slice(1)
        .map(value => parseInt(value, 10))
        .map(value => (Number.isNaN(value) ? null : value));
      return new Slice(start, stop, step);
    }

    // Handle the double bracket syntax and the standard Python syntax.
    if (/^(-?\d+)?(,(-?\d+)?(,(-?\d+)?)?)$/.test(cleanedString)) {
      const [start, stop, step] = cleanedString.split(',')
        .map(part => (part.length ? part : null));
      return new Slice(start, stop, step);
    }

    return null;
  };

  indices = (array) => {
    // Handle negative indices while preserving `null` values.
    const start = this.start < 0 ? this.start + array.length : this.start;
    const stop = this.stop < 0 ? this.stop + array.length : this.stop;

    // Set the default step to `1`.
    const step = this.step == null ? 1 : this.step;
    if (step === 0) {
      throw new Error('slice step cannot be zero');
    }

    // Find the starting index, and construct a check for if an index should be included.
    let currentIndex;
    let indexIsValid;
    if (step > 0) {
      currentIndex = start == null ? 0 : Math.max(start, 0);
      const maximumPossibleIndex = stop == null ? array.length - 1 : stop - 1;
      indexIsValid = index => (index <= maximumPossibleIndex);
    } else {
      currentIndex = start == null ? array.length - 1 : Math.min(start, array.length - 1);
      const minimumPossibleIndex = stop == null ? 0 : stop + 1;
      indexIsValid = index => (index >= minimumPossibleIndex);
    }

    // Loop through and add indices until we've completed the loop.
    const indices = [];
    while (indexIsValid(currentIndex)) {
      if (currentIndex >= 0 && currentIndex < array.length) {
        indices.push(currentIndex);
      }
      currentIndex += step;
    }

    return indices;
  };

  //
  // Methods which correspond directly to proxy trap handlers.
  //

  deleteProperty = array => (
    this.indices(array)
      // eslint-disable-next-line no-param-reassign
      .every(index => delete array[index])
  );

  get = (array) => {
    let extracted;
    // We can use the built in `Array.slice()` method for this special case.
    if (array.slice && (this.step == null || this.step === 1)) {
      const start = this.start == null ? undefined : this.start;
      const stop = this.stop == null ? undefined : this.stop;
      extracted = array.slice(start, stop);
    } else {
      extracted = this.indices(array)
        .map(index => array[index]);
    }

    if (array instanceof String) {
      return extracted.join('');
    }

    return extracted;
  };

  has = array => (
    this.indices(array)
      .every(index => index in array)
  );

  set = (array, values) => {
    // We can insert arrays of any length for unextended slices.
    if (array.splice && (this.step == null || this.step === 1)) {
      const start = this.start < 0 ? Math.max(this.start + array.length, 0) : this.start;
      const stop = this.stop < 0 ? this.stop + array.length : this.stop;
      const deleteCount = this.stop == null ? array.length : stop - start;
      array.splice(start, deleteCount, ...values);
      return true;
    }

    // Otherwise, the lengths must match and we need to do them one-by-one.
    const indices = this.indices(array);
    if (indices.length !== values.length) {
      throw new Error((
        `attempt to assign sequence of size ${values.length} ` +
        `to extended slice of size ${indices.length}`
      ));
    }

    this.indices(array)
      .forEach((arrayIndex, valuesIndex) => {
        // eslint-disable-next-line no-param-reassign
        array[arrayIndex] = values[valuesIndex];
      });
    return true;
  };

  toString = () => {
    // Force `undefined`/`null` to both show up as `null`.
    const normalize = value => (value == null ? null : value);
    return `Slice(${normalize(this.start)}, ${normalize(this.stop)}, ${normalize(this.step)})`;
  };
}


const slice = (...args) => new Slice(...args);


export {
  slice as default,
  Slice,
};
