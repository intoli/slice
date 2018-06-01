import Slice from './slice';


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
  const key = (name || '').toString()
    // Remove all whitespace.
    .replace(/\s/g, '')
    // Replace commas with colons.
    .replace(/,/g, ':');

  // Handle negative indices.
  if (/^-\d+$/.test(key)) {
    return Reflect[action](target, target.length + parseInt(key, 10), value);
  }

  // Handle slices.
  if (/^(-?\d+)?(:(-?\d+)?(:(-?\d+)?)?)$/.test(key)) {
    const [start, stop, step] = key.split(':').map(part => (
      part.length ? part : undefined
    ));
    const slice = new Slice(start, stop, step);
    return slice[action](target, value);
  }

  // Fall back to the array's own properties.
  return Reflect[action](target, name, value);
};

export const sliceProxyHandler = {
  get: constructTrap('get'),
  set: constructTrap('set'),
};
