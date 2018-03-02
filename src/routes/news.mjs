'use strict';

import x from './../xray';
import { BASE, NEWS_URL } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/news`,
  handler: (request, h) => {
    const selector = '#atm-comunicati div.news-item';
    const schema = [{
      text: '@text',
      url: 'a@href'
    }];
    return x(NEWS_URL, selector, schema ).then(data => data);
  }
}