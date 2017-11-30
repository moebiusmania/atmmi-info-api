'use strict';

import x from './../xray';
import { BASE, MAP_URL } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/map`,
  handler: (request, reply) => {
    const selector = 'div.atm-testo a';
    const schema = [{
      title: '@title',
      url: '@href'
    }];
    const stream = x(MAP_URL, selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      let url = `https://www.atm.it${json[0].url}`;
      reply({url: url});
    });
  }
}

