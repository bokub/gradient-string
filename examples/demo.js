// Run with npm run-script demo
const gradient = require('..');

const log = console.log;
const str = '   Lorem ipsum dolor sit amet, consectetur adipiscing elit';

log('');

for (const t of ['atlas', 'pastel', 'morning', 'cristal', 'rainbow']) {
	log(gradient[t](str) + '\n');
}

log('');
