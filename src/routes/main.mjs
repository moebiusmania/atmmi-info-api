'use strict';

import pkg from './../../package.json';
import { BASE } from './../constants';

export default {
  method: 'GET',
  path: BASE,
  handler: (request, reply) => {
    reply({
      status: "Up & running",
      now: new Date(),
      routes: [
        `${BASE}/traffic`,
        `${BASE}/status`,
        `${BASE}/news`,
        `${BASE}/twitter`,
        `${BASE}/map`
      ], 
      package: pkg
    });
  }
}
