'use strict';

import x from './../xray';
import { BASE, NEWS_URL } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/status`,
  handler: (request, h) => {
    const selector = '#StatusLinee tr';
    const schema = [{
      line: 'div.StatusLinee_Stretch span@id',
      text: 'div.StatusLinee_DirezioneScritta@html | trim',
      status: 'div.StatusLinee_Stretch span@html | trim'
    }];
    return x(NEWS_URL, selector, schema ).then( data => {
      const resp = data.filter(e => e.text).map(e => {
        const _line = e.line.match(/([M][0-9])\w/g)[0].replace('_','');
        return Object.assign({}, e, {line: _line});
      });
      return resp;
    });
  }
}