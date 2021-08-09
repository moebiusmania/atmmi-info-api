'use strict';

const x = require('./../xray');
const { BASE, NEWS_URL } = require('./../constants');

module.exports = {
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
