'use strict';

const PORT = 8080;
const Hapi = require('hapi');
const Xray = require('x-ray');
const x = Xray();
const server = new Hapi.Server();

server.connection({ port: PORT });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const selector = '#menu-item-752 > ul li';
    const stream = x('http://www.contactlab.com', selector, [{
      title: 'a@html',
      url: 'a@href'
    }]).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
});

console.log(`Starting service at port ${PORT}`);
server.start(() => {});