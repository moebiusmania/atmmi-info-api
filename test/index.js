'use strict';

import test from 'ava';
import http from 'ava-http';

const base = 'http://localhost:8080/v1';

test('Base route', async t => {
  const res = await http.get(base);
  t.true(res.status === 'Up & running');
  t.true(res.routes.length === 4);
  t.true(typeof res.package === 'object');
});