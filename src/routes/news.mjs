'use strict';

import x from './../xray';

export default {
  method: 'GET',
  path: '/api/news',
  handler: (request, reply) => {
    const selector = '#atm-comunicati div.news-item';
    const schema = [{
      text: '@text',
      url: 'a@href'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
}