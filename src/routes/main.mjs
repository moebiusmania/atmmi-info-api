'use strict';

import pkg from './../../package.json';
import { BASE } from './../constants';

export default {
  method: 'GET',
  path: BASE,
  handler: (request, h) => {
    return {
      status: "Up & running",
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
}