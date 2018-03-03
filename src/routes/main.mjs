'use strict';

import pkg from './../../package';
import {BASE} from './../constants';

export default {
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
        `${BASE}/twitter`,
        `${BASE}/map`
      ], 
      package: pkg
    };
  }
};
