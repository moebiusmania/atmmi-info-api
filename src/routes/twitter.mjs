'use strict';

import x from './../xray';

export default {
  method: 'GET',
  path: '/api/twitter',
  handler: (request, reply) => {
    const selector = 'li.js-stream-item.stream-item.stream-item';
    const schema = [{
      text: 'div.js-tweet-text-container p@text',
      time: 'div.stream-item-header span.js-relative-timestamp@text | trim',
      url: 'a.tweet-timestamp.js-permalink@href'
    }];
    const stream = x('https://twitter.com/atm_informa', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
}