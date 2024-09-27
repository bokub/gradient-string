#!/usr/bin/env node

// Run with "npm run demo"
import gradient from '../dist/index.js';

const { log } = console;
const str = '   	Lorem ipsum dolor sit amet, consectetur adipiscing elit';
const title = `
                      _ _            _            _        _             
   __ _ _ __ __ _  __| (_) ___ _ __ | |_      ___| |_ _ __(_)_ __   __ _ 
  / _\` | '__/ _\` |/ _\` | |/ _ \\ '_ \\| __|____/ __| __| '__| | '_ \\ / _\` |
 | (_| | | | (_| | (_| | |  __/ | | | ||_____\\__ \\ |_| |  | | | | | (_| |
  \\__, |_|  \\__,_|\\__,_|_|\\___|_| |_|\\__|    |___/\\__|_|  |_|_| |_|\\__, |
  |___/                                                            |___/ 
`;

log(gradient.pastel.multiline(title) + '\n');

for (const t of ['atlas', 'pastel', 'morning', 'cristal', 'rainbow']) {
  log(gradient[t](str) + '\n');
}

log('');
