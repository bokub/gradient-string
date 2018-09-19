#!/usr/bin/env node

// Run with npm run demo
const gradient = require('..');

const {log} = console;
const str = '   	Lorem ipsum dolor sit amet, consectetur adipiscing elit';
const title = Buffer.from('DQogICAgICAgICAgICAgICAgICAgICAgXyBfICAgICAgICAgICAgXyAgICAgICAgICAgIF8gICAgICAgIF8gICAgICAgICAgICAgDQogICBfXyBfIF8gX18gX18gXyAgX198IChfKSBfX18gXyBfXyB8IHxfICAgICAgX19ffCB8XyBfIF9fKF8pXyBfXyAgIF9fIF8gDQogIC8gX2AgfCAnX18vIF9gIHwvIF9gIHwgfC8gXyBcICdfIFx8IF9ffF9fX18vIF9ffCBfX3wgJ19ffCB8ICdfIFwgLyBfYCB8DQogfCAoX3wgfCB8IHwgKF98IHwgKF98IHwgfCAgX18vIHwgfCB8IHx8X19fX19cX18gXCB8X3wgfCAgfCB8IHwgfCB8IChffCB8DQogIFxfXywgfF98ICBcX18sX3xcX18sX3xffFxfX198X3wgfF98XF9ffCAgICB8X19fL1xfX3xffCAgfF98X3wgfF98XF9fLCB8DQogIHxfX18vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfF9fXy8gDQo=', 'base64').toString();

log(gradient.pastel.multiline(title) + '\n');

for (const t of ['atlas', 'pastel', 'morning', 'cristal', 'rainbow']) {
	log(gradient[t](str) + '\n');
}

log('');
