'use strict';

const x = require('./../xray');
const { NEWS_URL } = require('./../constants');

module.exports = {
  method: 'GET',
  path: `/traffic`,
  handler: async () => {
    const selector = '#subhomepage-cx-infomobilita > div:nth-child(1) > table div.item.link-item';
    const schema = [{
      text: 'a@html',
      url: 'a@href'
    }];
    const data = await x(NEWS_URL, selector, schema);
    return data;
  }
};
