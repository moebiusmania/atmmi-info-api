'use strict';

const Xray = require('x-ray');

const filters = {
  trim: (value) => {
    return typeof value === 'string' ? value.trim() : value
  }
}

export const x = Xray({
  filters: filters
});