'use strict';

const chalk = require('chalk');
const tinygradient = require('tinygradient');

function InitGradient() {
	const grad = tinygradient.apply(this, arguments);
	return (str, opts) => applyGradient(str.toString(), grad, opts);
}

function applyGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const colors = options.interpolation.toLowerCase() === 'hsv' ? gradient.hsv(str.length, options.hsvSpin) : gradient.rgb(str.length);
	let result = '';
	for (let i = 0, len = str.length; i < len; i++) {
		result += chalk.hex(colors[i].toHex())(str[i]);
	}
	return result;
}

function validateOptions(opts) {
	const options = Object.assign({interpolation: 'rgb', hsvSpin: 'short'}, opts);
	if (opts !== undefined && typeof opts !== 'object') {
		throw new TypeError(`Expected \`options\` to be an \`object\`, got \`${typeof opts}\``);
	}

	if (typeof options.interpolation !== 'string') {
		throw new TypeError(`Expected \`options.interpolation\` to be a \`string\`, got \`${typeof options.interpolation}\``);
	}

	if (options.interpolation.toLowerCase() === 'hsv' && typeof options.hsvSpin !== 'string') {
		throw new TypeError(`Expected \`options.hsvSpin\` to be a \`string\`, got \`${typeof options.hsvSpin}\``);
	}
	return options;
}

module.exports = InitGradient;
