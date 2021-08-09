'use strict';

//import pkg from './../../package';
const pkg = require('./../../package.json');
const { BASE } = require('./../constants');

module.exports = {
  method: 'GET',
  path: BASE,
  handler: () => {
    return {
      status: 'Up & running',
      now: new Date(),
      routes: [
        `${BASE}/traffic`,
        `${BASE}/status`,
        `${BASE}/news`,
        `${BASE}/twitter`
      ],
      package: pkg
    };
  }
};