export const range = (start, end) => (
  end == null ? range(0, start) :
    Array(end - start)
      .fill()
      .map((_, index) => index + start)
);
