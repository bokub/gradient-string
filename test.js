import test from 'ava';
import g from '.';

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

/* eslint-disable unicorn/escape-case */
test('works fine', t => {
	assertEqualOne(t, g('blue', 'white', 'red')('abc'), [
		'\u001b[94ma\u001b[39m\u001b[97mb\u001b[39m\u001b[91mc\u001b[39m',
		'\u001b[38;2;0;0;255ma\u001b[39m\u001b[38;2;255;255;255mb\u001b[39m\u001b[38;2;255;0;0mc\u001b[39m'
	]);

	// Red -> yellow -> green (short arc)
	assertEqualOne(t, g('red', 'green')('abc', {interpolation: 'hsv'}), [
		'\u001b[91ma\u001b[39m\u001b[33mb\u001b[39m\u001b[32mc\u001b[39m',
		'\u001b[38;2;255;0;0ma\u001b[39m\u001b[38;2;191;191;0mb\u001b[39m\u001b[38;2;0;128;0mc\u001b[39m'
	]);

	// Red -> blue -> green (long arc)
	assertEqualOne(t, g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}), [
		'\u001b[91ma\u001b[39m\u001b[34mb\u001b[39m\u001b[32mc\u001b[39m',
		'\u001b[38;2;255;0;0ma\u001b[39m\u001b[38;2;0;0;191mb\u001b[39m\u001b[38;2;0;128;0mc\u001b[39m'
	]);
});

test('varargs syntax equal to array syntax', t => {
	t.is(g('yellow', 'green')('abc'), g(['yellow', 'green'])('abc'));
});

test('supports aliases', t => {
	t.is(g.cristal('Hello world'), g('#bdfff3', '#4ac29a')('Hello world'));
	t.is(g.pastel('Hello world'), g('#74ebd5', '#74ecd5')('Hello world', {interpolation: 'hsv', hsvSpin: 'long'}));
});

test('multiline option works the same way on one line strings', t => {
	t.is(g('blue', 'white', 'red').multiline('abc'), g('blue', 'white', 'red')('abc'));
	t.is(g('red', 'green').multiline('abc', {interpolation: 'hsv'}), g('red', 'green')('abc', {interpolation: 'hsv'}));
});

test('multiline option works fine', t => {
	t.is(g('orange', 'purple').multiline('hello\nworld'), g('orange', 'purple')('hello') + '\n' + g('orange', 'purple')('world'));
	t.is(g.atlas.multiline('abc\n\ndef'), g.atlas('abc') + '\n\n' + g.atlas('def'));
	t.not(g.rainbow.multiline('hi\nworld'), g.rainbow('hi') + '\n' + g.rainbow('world'));
});

test('case insensitive options', t => {
	t.is(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}), g('red', 'green')('abc', {interpolation: 'HSV', hsvSpin: 'Long'}));
});

// Asset that actual is equal to at least one element of expected
function assertEqualOne(t, actual, expected) {
	t.true(expected.indexOf(actual) > -1);
}
