'use strict';

import Xray from 'x-ray';

const filters = {
  trim: (value) => {
    return typeof value === 'string' ? value.trim() : value
  }
}

export default Xray({
  filters: filters
});