'use strict';

const chalk = require('chalk');
const tinygradient = require('tinygradient');

const forbiddenChars = /\s/g;

function InitGradient() {
	const grad = tinygradient.apply(this, arguments);
	return (str, opts) => applyGradient(str ? str.toString() : '', grad, opts);
}

function applyGradient(str, gradient, opts) {
	const options = validateOptions(opts);
	const colorsCount = Math.max(str.replace(forbiddenChars, '').length, gradient.stops.length);
	const colors = options.interpolation.toLowerCase() === 'hsv' ? gradient.hsv(colorsCount, options.hsvSpin.toLowerCase()) : gradient.rgb(colorsCount);
	let result = '';
	for (const s of str) {
		result += s.match(forbiddenChars) ? s : chalk.hex(colors.shift().toHex())(s);
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

module.exports.atlas = str => new InitGradient('#FEAC5E', '#C779D0', '#4BC0C8')(str);
module.exports.cristal = str => new InitGradient('#4AC29A', '#BDFFF3')(str);
module.exports.morning = str => new InitGradient('#FF5F6D', '#FFC371')(str);
module.exports.rainbow = str => new InitGradient('#ff0000', '#ff0100')(str, {interpolation: 'hsv', hsvSpin: 'long'});
