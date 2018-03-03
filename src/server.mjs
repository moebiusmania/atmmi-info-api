'use strict';

import Hapi from 'hapi';
import main from './routes/main';
import twitter from './routes/twitter';
import news from './routes/news';
import status from './routes/status';
import traffic from './routes/traffic';
import {PORT} from './constants';

const CONF_PORT = process.env.PORT || PORT;

const server = new Hapi.Server({
  host: 'localhost',
  port: CONF_PORT
});

const ROUTES = [main, twitter, news, status, traffic];

const routeOpts = {cors: {origin: 'ignore'}};

const cors = ROUTES.map(route => new Object({...route, options: routeOpts}));

cors.forEach(module => server.route(module));

console.log(`Starting service at port ${CONF_PORT}`);

server.start(() => {});
