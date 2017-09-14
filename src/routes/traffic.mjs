'use strict';

import x from './../xray';

export default {
  method: 'GET',
  path: '/api/traffic',
  handler: (request, reply) => {
    const selector = '#subhomepage-cx-infomobilita > div:nth-child(1) > table div.item.link-item';
    const schema = [{
      text: 'a@html',
      url: 'a@href'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
}