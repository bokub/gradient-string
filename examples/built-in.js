#!/usr/bin/env node

// Run with npm run built-in
const gradient = require('..');

const {log} = console;
const str = '■'.repeat(48);

log('');

for (const t of [
	'cristal',
	'teen',
	'mind',
	'morning',
	'vice',
	'passion',
	'fruit',
	'instagram',
	'atlas',
	'retro',
	'summer',
	'pastel',
	'rainbow'
]) {
	log(pad(t), gradient[t](str));
}

log('');

function pad(s) {
	let i = -1;
	const l = 11 - s.length;
	while (++i < l) {
		s += ' ';
	}
	return '  ' + s;
}
