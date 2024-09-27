import {describe, it, expect} from 'vitest';
import g from '.';

describe('Gradient Tests', () => {
	it('should throw an error if wrong gradient arguments are passed', () => {
		expect(() => g()('abc')).toThrow();
		expect(() => g('red')('abc')).toThrow();
	});

	it('should not throw an error if there is nothing to color', () => {
		expect(g('gold', 'silver')()).toBe('');
		expect(g('gold', 'silver')(null)).toBe('');
	});

	it('should throw an error if options is not an object', () => {
		expect(() => g('blue', 'red')('abc', false)).toThrowError('Expected `options` to be an `object`, got `boolean`');
	});

	it('should throw an error if interpolation is not a string', () => {
		expect(() => g('blue', 'red')('abc', {interpolation: 1000})).toThrowError('Expected `options.interpolation` to be a `string`, got `number`');
	});

	it('should throw an error if hsvSpin is not a string, but only if interpolation is HSV', () => {
		expect(() => g('blue', 'red')('abc', {hsvSpin: 42})).not.toThrow();
		expect(() => g('blue', 'red')('abc', {interpolation: 'hsv', hsvSpin: 42})).toThrowError('Expected `options.hsvSpin` to be a `string`, got `number`');
	});

	it('should work correctly with different gradient and interpolation options', () => {
		expect(g('blue', 'white', 'red')('abc')).not.toBe('abc');

		// Red -> yellow -> green (short arc)
		expect(g('red', 'green')('abc')).not.toBe(g('red', 'green')('abc', {interpolation: 'hsv'}));

		// Red -> blue -> green (long arc)
		expect(g('red', 'green')('abc')).not.toBe(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}));
		expect(g('red', 'green')('abc', {interpolation: 'hsv'})).not.toBe(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'}));
	});

	it('should support varargs syntax equal to array syntax', () => {
		expect(g('yellow', 'green')('abc')).toBe(g(['yellow', 'green'])('abc'));
	});

	it('should support aliases', () => {
		expect(g.cristal('Hello world')).toBe(g('#bdfff3', '#4ac29a')('Hello world'));
		expect(g.pastel('Hello world')).toBe(g('#74ebd5', '#74ecd5')('Hello world', {interpolation: 'hsv', hsvSpin: 'long'}));
	});

	it('multiline option should work the same way on one-line strings', () => {
		expect(g('blue', 'white', 'red').multiline('abc')).toBe(g('blue', 'white', 'red')('abc'));
		expect(g('red', 'green').multiline('abc', {interpolation: 'hsv'})).toBe(g('red', 'green')('abc', {interpolation: 'hsv'}));
	});

	it('multiline option should work correctly', () => {
		expect(g('orange', 'purple').multiline('hello\nworld')).toBe(g('orange', 'purple')('hello') + '\n' + g('orange', 'purple')('world'));
		expect(g.atlas.multiline('abc\n\ndef')).toBe(g.atlas('abc') + '\n\n' + g.atlas('def'));
		expect(g.rainbow.multiline('hi\nworld')).not.toBe(g.rainbow('hi') + '\n' + g.rainbow('world'));
	});

	it('case-insensitive options should work correctly', () => {
		expect(g('red', 'green')('abc', {interpolation: 'hsv', hsvSpin: 'long'})).toBe(g('red', 'green')('abc', {interpolation: 'HSV', hsvSpin: 'Long'}));
	});
});
