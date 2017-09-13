'use strict';

const Xray = require('x-ray');

const filters = {
  trim: (value) => {
    return typeof value === 'string' ? value.trim() : value
  }
}

module.exports = Xray({
  filters: filters
});