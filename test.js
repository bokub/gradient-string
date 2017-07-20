import test from 'ava';
import g from './';

test('throw error if wrong gradient arguments', t => {
	t.throws(() => g()('abc'));
	t.throws(() => g('red')('abc'));
});

test('do not throw error if nothing to color', t => {
	t.is(g('gold', 'silver')(), '');
	t.is(g('gold', 'silver')(null), '');
});

test('throw error if options is not an object', t => {
	t.throws(() => g('blue', 'red')('abc', false), 'Expected `options` to be an `object`, got `boolean`');
});

test('throw error if interpolation is not a string', t => {
	t.throws(() => g('blue', 'red')('abc', {interpolation: 1000}), 'Expected `options.interpolation` to be a `string`, got `number`');
});

test('throw error if hsvSpin is not a string, but only if interpolation is HSV', t => {
	t.notThrows(() => g('blue', 'red')('abc', {hsvSpin: 42}));
	t.throws(() => g('blue', 'red')('abc', {interpolation: 'hsv', hsvSpin: 42}), 'Expected `options.hsvSpin` to be a `string`, got `number`');
});

test('works fine', t => {
	t.is(g('blue', 'white', 'red')('abc'), '\u001b[94ma\u001b[39m\u001b[97mb\u001b[39m\u001b[91mc\u001b[39m');

	t.is(g('yellow', 'green')('abc'), g(['yellow', 'green'])('abc')); // Varargs syntax equal to array syntax

	t.is(g('red', 'green')('abc', {interpolation: 'hsv'}),
		'\u001b[91ma\u001b[39m\u001b[33mb\u001b[39m\u001b[32mc\u001b[39m'); // Red -> yellow -> green (short arc)

	t.is(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}),
		'\u001b[91ma\u001b[39m\u001b[34mb\u001b[39m\u001b[32mc\u001b[39m'); // Red -> blue -> green (long arc)
});

test('case insensitive options', t => {
	t.is(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}), g('red', 'green')('abc', {interpolation: 'HSV', hsvSpin: 'Long'}));
});
