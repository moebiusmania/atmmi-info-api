'use strict';

const BASE = '/v1';
const PORT = process.env.PORT || 8080;
const NEWS_URL = 'https://www.atm.it/it/AtmNews/Pagine/default.aspx';
const TRAFFIC_URL = 'https://www.atm.it/it/ViaggiaConNoi/InfoTraffico/Pagine/default2.aspx';

export {
  BASE, PORT, NEWS_URL, TRAFFIC_URL
}
