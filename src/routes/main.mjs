'use strict';

import pkg from './../../package.json';

export default {
  method: 'GET',
  path: '/api',
  handler: (request, reply) => {
    reply({
      status: "Up & running",
      now: new Date(),
      routes: [
        "/api/traffic",
        "/api/status",
        "/api/news",
        "/api/twitter"
      ], 
      package: pkg
    });
  }
}