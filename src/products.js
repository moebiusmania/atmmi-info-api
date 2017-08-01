'use strict';

const Xray = require('x-ray');
const x = Xray();

const selector = '#menu-item-752 > ul li';

const stream = x('http://www.contactlab.com', selector, [{
    title: 'a@html',
    url: 'a@href'
}]).stream();