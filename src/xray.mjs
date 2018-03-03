'use strict';

import Xray from 'x-ray';

const filters = {
  trim: value => typeof value === 'string' ? value.trim() : value
};

export default Xray({filters}); // eslint-disable-line new-cap
