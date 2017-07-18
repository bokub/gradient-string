'use strict';

const chalk = require('chalk');
const tinygradient = require('tinygradient');

function InitGradient() {
	const grad = tinygradient.apply(this, arguments);
	return str => applyGradient(str.toString(), grad);
}

function applyGradient(str, gradient) {
	const colors = gradient.rgb(str.length);
	let result = '';
	for (let i = 0, len = str.length; i < len; i++) {
		result += chalk.hex(colors[i].toHex())(str[i]);
	}
	return result;
}

module.exports = InitGradient;
