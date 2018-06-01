import SliceArray from './slice-array';


const range = (start, stop, step = 1) => {
  if (stop == null) {
    return range(0, start);
  } else if (step === 1) {
    return new SliceArray(Math.max(stop - start, 0))
      .fill()
      .map((_, index) => index + start);
  }
  const isValid = value => (step > 0 ? value < stop : value > stop);
  const values = new SliceArray();
  let currentValue = start;
  while (isValid(currentValue)) {
    values.push(currentValue);
    currentValue += step;
  }
  return values;
};


export default range;
