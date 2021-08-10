'use strict';

const x = require('./../xray');

module.exports = {
  method: 'GET',
  path: `/twitter`,
  handler: async () => {
    const selector = 'li.js-stream-item.stream-item.stream-item';
    const schema = [{
      text: 'div.js-tweet-text-container p@text',
      time: 'div.stream-item-header span.js-relative-timestamp@text | trim',
      url: 'a.tweet-timestamp.js-permalink@href'
    }];
    const data = await x('https://twitter.com/atm_informa', selector, schema);
    return data;
  }
};
