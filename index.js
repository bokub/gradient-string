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

module.exports.atlas = str => new InitGradient('#feac5e', '#c779d0', '#4bc0c8')(str);
module.exports.cristal = str => new InitGradient('#bdfff3', '#4ac29a')(str);
module.exports.teen = str => new InitGradient('#77a1d3', '#79cbca', '#e684ae')(str);
module.exports.mind = str => new InitGradient('#473b7b', '#3584a7', '#30d2be')(str);
module.exports.morning = str => new InitGradient('#ff5f6d', '#ffc371')(str, {interpolation: 'hsv'});
module.exports.vice = str => new InitGradient('#5ee7df', '#b490ca')(str, {interpolation: 'hsv'});
module.exports.passion = str => new InitGradient('#f43b47', '#453a94')(str);
module.exports.fruit = str => new InitGradient('#ff4e50', '#f9d423')(str);
module.exports.instagram = str => new InitGradient('#833ab4', '#fd1d1d', '#fcb045')(str);
module.exports.retro = str => new InitGradient('#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978')(str);
module.exports.summer = str => new InitGradient('#fdbb2d', '#22c1c3')(str);
module.exports.rainbow = str => new InitGradient('#ff0000', '#ff0100')(str, {interpolation: 'hsv', hsvSpin: 'long'});
module.exports.pastel = str => new InitGradient('#74ebd5', '#74ecd5')(str, {interpolation: 'hsv', hsvSpin: 'long'});
