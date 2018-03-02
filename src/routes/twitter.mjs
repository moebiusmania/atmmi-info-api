'use strict';

import x from './../xray';
import { BASE } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/twitter`,
  handler: (request, h) => {
    const selector = 'li.js-stream-item.stream-item.stream-item';
    const schema = [{
      text: 'div.js-tweet-text-container p@text',
      time: 'div.stream-item-header span.js-relative-timestamp@text | trim',
      url: 'a.tweet-timestamp.js-permalink@href'
    }];
    return x('https://twitter.com/atm_informa', selector, schema ).then(data => data);
  }
}