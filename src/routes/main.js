const omit = require('lodash/omit');

const pkg = require('../../package.json');

const meta = omit(pkg, ['scripts', 'dependencies', 'devDependencies', 'xo', 'main']);

module.exports = {
  method: 'GET',
  path: '/',
  handler: () => ({
    status: 'Up & running',
    now: new Date(),
    routes: [
      '/traffic',
      '/status',
      '/news',
    ],
    meta,
  }),
};
