'use strict';

import x from './../xray';
import {BASE, NEWS_URL} from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/news`,
  handler: async () => {
    const selector = '#atm-comunicati div.news-item';
    const schema = [{
      text: '@text',
      url: 'a@href'
    }];
    const data = await x(NEWS_URL, selector, schema);
    return data;
  }
};
