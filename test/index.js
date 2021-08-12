'use strict';

const test = require('ava');
const http = require('ava-http');

const base = 'http://localhost:8080';

test('Base route', async t => {
  const res = await http.get(base);

  t.true(res.status === 'Up & running');
  t.true(res.routes.length === 3);
  t.true(typeof res.meta === 'object');
});

test('/traffic', async t => {
  const res = await http.get(base + '/traffic');
  const [first] = res;

  t.truthy(res.length);
  t.truthy(first.text && first.url);
});

test('/status', async t => {
  const res = await http.get(base + '/status');
  const [first] = res;

  t.true(res.length && res.length === 11);
  t.truthy(first.line && first.text && first.status);
});

test('/news', async t => {
  const res = await http.get(base + '/news');
  const [first] = res;

  t.true(res.length && res.length === 4);
  t.truthy(first.text && first.url);
});
