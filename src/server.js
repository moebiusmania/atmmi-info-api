'use strict';

const Hapi = require('@hapi/hapi');
const main = require('./routes/main');
const news = require('./routes/news');
const status = require('./routes/status');
const traffic = require('./routes/traffic');
const { PORT } = require('./constants');

const CONF_PORT = process.env.PORT || PORT;

const CONFIG = process.env.NODE_ENV === 'production' ? 
  { port: CONF_PORT } : { port: CONF_PORT, host: 'localhost' };

const server = new Hapi.Server(CONFIG);

const ROUTES = [main, news, status, traffic];

const routeOpts = { cors: { origin: 'ignore' } };

const cors = ROUTES.map(route => new Object({ ...route, options: routeOpts }));

cors.forEach(module => server.route(module));

const init = async () => {

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();