#!/usr/bin/env node

// Run with "npm run built-in"
import gradient from '../dist/index.js';

const { log } = console;
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
  'rainbow',
]) {
  log('  ' + t.padEnd(11, ' '), gradient[t](str));
}

log('');
