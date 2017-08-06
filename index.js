'use strict';

const PORT = 8080;
const Hapi = require('hapi');
const Xray = require('x-ray');
const x = Xray({
  filters: {
    trim: (value) => {
      return typeof value === 'string' ? value.trim() : value
    }
  }
});
const server = new Hapi.Server();

server.connection({ port: PORT });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({
      status: "Up & running",
      now: new Date(),
      package: require('./package.json')
    });
  }
});

server.route({
  method: 'GET',
  path: '/traffic',
  handler: (request, reply) => {
    const selector = '#subhomepage-cx-infomobilita > div:nth-child(1) > table div.item.link-item';
    const schema = [{
      text: 'a@html',
      url: 'a@href'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
});

server.route({
  method: 'GET',
  path: '/status',
  handler: (request, reply) => {
    const selector = '#StatusLinee tr';
    const schema = [{
      text: 'div.StatusLinee_DirezioneScritta@html | trim',
      status: 'div.StatusLinee_Stretch span@html | trim'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
});

console.log(`Starting service at port ${PORT}`);
server.start(() => {});