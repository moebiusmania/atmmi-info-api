'use strict';

import x from './../xray';
import { BASE, NEWS_URL } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/news`,
  handler: (request, reply) => {
    const selector = '#atm-comunicati div.news-item';
    const schema = [{
      text: '@text',
      url: 'a@href'
    }];
    const stream = x(NEWS_URL, selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
}