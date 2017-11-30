'use strict';

import x from './../xray';
import { BASE, TRAFFIC_URL } from './../constants';

export default {
  method: 'GET',
  path: `${BASE}/traffic`,
  handler: (request, reply) => {
    const selector = '#atm-pager-top table.NewsGrid tbody tr';
    const schema = [{
      title: 'td.Infomobilita-Titolo@text | trim',
      url: 'td.Infomobilita-Titolo a@href',
      validityFrom: 'td.Infomobilita-Data@text | trim',
      validityTo: 'td.Infomobilita-DataScadenza@text | trim'
    }];
    const stream = x(TRAFFIC_URL, selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      json.forEach(e => {
        let fromDate = e.validityFrom.match(/\d+/g);
        let toDate = e.validityTo.match(/\d+/g);
        e.validityFrom = new Date(fromDate[2], fromDate[1]-1, fromDate[0]);
        e.validityTo = new Date(toDate[2], fromDate[1]-1, fromDate[0]);
      });
      json.sort((e1,e2) => e1.validityTo - e2.validityTo);
      reply(json);
    });
  }
}
