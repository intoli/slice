import { allowConstructionWithoutNew, sliceProxyHandler } from './common';


class SliceString extends String {
  constructor(...args) {
    super(...args);
    return new Proxy(this, sliceProxyHandler);
  }
}

export default allowConstructionWithoutNew(SliceString);
