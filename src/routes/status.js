const x = require('../xray');
const { NEWS_URL } = require('../constants');

module.exports = {
  method: 'GET',
  path: '/status',
  handler: async () => {
    const selector = '#StatusLinee tr';
    const schema = [{
      line: 'div.StatusLinee_Stretch span@id',
      text: 'div.StatusLinee_DirezioneScritta@html | trim',
      status: 'div.StatusLinee_Stretch span@html | trim',
    }];

    const data = await x(NEWS_URL, selector, schema);
    const resp = data.filter((e) => e.text).map((e) => {
      const line = e.line.match(/([M][0-9])\w/g)[0].replace('_', '');
      return { ...e, line };
    });

    return resp;
  },
};
