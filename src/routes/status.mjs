'use strict';

import x from './../xray';

export default {
  method: 'GET',
  path: '/api/status',
  handler: (request, reply) => {
    const selector = '#StatusLinee tr';
    const schema = [{
      line: 'div.StatusLinee_Stretch span@id',
      text: 'div.StatusLinee_DirezioneScritta@html | trim',
      status: 'div.StatusLinee_Stretch span@html | trim'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      const resp = json.filter(e => e.text).map(e => {
        const _line = e.line.match(/([M][0-9])\w/g)[0].replace('_','');
        return Object.assign({}, e, {line: _line});
      });
      reply(resp);
    });
  }
}