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

  // Fall back to the array's own properties...
  const result = Reflect[action](target, name, value);

  // ...but we need to doe some special handling to bind and wrap functions.
  if (action === 'get' && typeof result === 'function') {
    const boundMethod = result.bind(target);
    // `Array` respects `Symbol.species`, but `String` doesn't. That means we need
    // to actually override any of its methods which return strings.
    if (target instanceof String && !['toString', 'valueOf'].includes(name)) {
      // We'll do this recursively to handle `String.match()` and the like.
      const convertStrings = (parent) => {
        if (typeof parent === 'string') {
          return new target.constructor(parent);
        }
        if (typeof parent === 'object') {
          Object.entries(parent)
            // eslint-disable-next-line no-param-reassign
            .forEach(([key, child]) => { parent[key] = convertStrings(child); });
        }
        return parent;
      };
      return (...args) => convertStrings(boundMethod(...args));
    }
    return boundMethod;
  }
  return result;
};

export const sliceProxyHandler = {
  deleteProperty: constructTrap('deleteProperty'),
  has: constructTrap('has'),
  get: constructTrap('get'),
  set: constructTrap('set'),
};
