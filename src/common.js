import { Slice } from './slice';


export const allowConstructionWithoutNew = (Class) => {
  // A little bit of a hack to allow construction with and without the `new` keyword.
  function construct(...args) {
    return new Class(...args);
  }
  Object.setPrototypeOf(construct, Object.getPrototypeOf(Class));
  construct.prototype = Class.prototype;
  return construct;
};

export const constructTrap = action => (target, name, value) => {
  // Handle negative indices.
  if (typeof name !== 'symbol' && /^\s*-\d+\s*$/.test(name)) {
    const negativeIndex = parseInt(name, 10);
    const index = negativeIndex === 0 ? negativeIndex : target.length + negativeIndex;
    return Reflect[action](target, index, value);
  }

  // Handle slices.
  const slice = Slice.from(name);
  if (slice) {
    const result = slice[action](target, value);
    if (!result && action !== 'get') {
      return result;
    }
    // Handles `Array.from()` and `new String()` construction.
    return target.constructor.from ?
      target.constructor.from(result) :
      new target.constructor(result);
  }

  // Fall back to the array's own properties.
  const result = Reflect[action](target, name, value);
  return typeof result === 'function' ? result.bind(target) : result;
};

export const sliceProxyHandler = {
  get: constructTrap('get'),
  set: constructTrap('set'),
};
