'use strict';

import Hapi from 'hapi';
import main from './routes/main';
import twitter from './routes/twitter';
import news from './routes/news';
import status from './routes/status';
import traffic from './routes/traffic';
import map from './routes/map';
import {PORT} from './constants';

const server = new Hapi.Server();
const CONF_PORT = process.env.PORT || PORT;

const server = new Hapi.Server({
  host: 'localhost',
  port: CONF_PORT
});

const ROUTES = [main, twitter, news, status, traffic, map];

const routeOpts = {cors: {origin: 'ignore'}};

const cors = ROUTES.map(route => new Object({...route, options: routeOpts}));

cors.forEach(module => server.route(module));

server.start(() => {console.log(`Server started at port ${CONF_PORT}`)});
