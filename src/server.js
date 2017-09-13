'use strict';

const PORT = 8080;
const Hapi = require('hapi');
const server = new Hapi.Server();

const ROUTES = [
  require('./routes/main')
];

server.connection({ port: PORT });

ROUTES.forEach( module => server.route(module) );

console.log(`Starting service at port ${PORT}`);
server.start(() => {});