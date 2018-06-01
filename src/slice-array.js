import { allowConstructionWithoutNew, sliceProxyHandler } from './common';


class SliceArray extends Array {
  constructor(...args) {
    super(...args);
    return new Proxy(this, sliceProxyHandler);
  }
}

export default allowConstructionWithoutNew(SliceArray);
