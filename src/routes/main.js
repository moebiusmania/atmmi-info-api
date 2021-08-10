'use strict';

const pkg = require('./../../package.json');

module.exports = {
  method: 'GET',
  path: '/',
  handler: () => {
    return {
      status: 'Up & running',
      now: new Date(),
      routes: [
        `/traffic`,
        `/status`,
        `/news`,
        `/twitter`
      ],
      package: pkg
    };
  }
};