const range = (start, end) => (
  end == null ? range(0, start) :
    Array(end - start)
      .fill()
      .map((_, index) => index + start)
);


// eslint-disable-next-line import/prefer-default-export
export { range };
