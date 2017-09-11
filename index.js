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
  path: '/api',
  handler: (request, reply) => {
    reply({
      status: "Up & running",
      now: new Date(),
      routes: [
        "/api/traffic",
        "/api/status",
        "/api/news",
        "/api/twitter"
      ], 
      package: require('./package.json')
    });
  }
});

server.route({
  method: 'GET',
  path: '/api/traffic',
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
  path: '/api/news',
  handler: (request, reply) => {
    const selector = '#atm-comunicati div.news-item';
    const schema = [{
      text: '@text',
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
  path: '/api/status',
  handler: (request, reply) => {
    const selector = '#StatusLinee tr';
    const schema = [{
      line: 'div.StatusLinee_Stretch span@id',
      text: 'div.StatusLinee_DirezioneScritta@html | trim',
      status: 'div.StatusLinee_Stretch span@html | trim'
    }];
    const stream = x('https://www.atm.it/it/AtmNews/Pagine/default.aspx', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      const resp = json.filter(e => e.text).map(e => {
        const _line = e.line.match(/([M][0-9])\w/g)[0].replace('_','');
        return Object.assign({}, e, {line: _line});
      });
      reply(resp);
    });
  }
});


server.route({
  method: 'GET',
  path: '/api/twitter',
  handler: (request, reply) => {
    const selector = 'li.js-stream-item.stream-item.stream-item';
    const schema = [{
      text: 'div.js-tweet-text-container p@text',
      time: 'div.stream-item-header span.js-relative-timestamp@text | trim',
      url: 'a.tweet-timestamp.js-permalink@href'
    }];
    const stream = x('https://twitter.com/atm_informa', selector, schema ).stream();
    stream.on('data', (data) => {
      const json = JSON.parse(data.toString());
      reply(json);
    });
  }
});

console.log(`Starting service at port ${PORT}`);
server.start(() => {});