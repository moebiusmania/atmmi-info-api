'use strict';

const Hapi = require('@hapi/hapi');
const main = require('./routes/main');
const news = require('./routes/news');
const status = require('./routes/status');
const traffic = require('./routes/traffic');
const twitter = require('./routes/twitter');
const { PORT } = require('./constants');

const CONF_PORT = process.env.PORT || PORT;

const server = new Hapi.Server({
  host: 'localhost',
  port: CONF_PORT
});

const ROUTES = [main, twitter, news, status, traffic];

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