const Xray = require('x-ray');

const filters = {
  trim: (value) => ((typeof value === 'string') ? value.trim() : value),
};

module.exports = Xray({ filters });
