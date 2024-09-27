import { describe, it, expect } from 'vitest';
import gradient, { rainbow, cristal, pastel, atlas } from '.';

describe('Gradient Tests', () => {
  it('should throw an error if wrong gradient arguments are passed', () => {
    expect(() => gradient()('abc')).toThrowError('Missing gradient colors');
    expect(() => gradient('red')('abc')).toThrowError('Expected an array of colors, received "red"');
    expect(() => gradient(['red'])('abc')).toThrowError('Invalid number of stops (< 2)');
  });

  it('should not throw an error if there is nothing to color', () => {
    // Deprecated v2 syntax
    expect((gradient('gold', 'silver') as any)()).toBe('');
    expect(gradient('gold', 'silver')(null as any)).toBe('');
    // v3 syntax
    expect((gradient(['gold', 'silver']) as any)()).toBe('');
    expect(gradient(['gold', 'silver'])(null as any)).toBe('');
  });

  it('should throw an error if options is not an object', () => {
    // Deprecated v2 syntax
    expect(() => gradient('blue', 'red')('abc', false as any)).toThrowError(
      'Expected `options` to be an `object`, got `boolean`',
    );
    // v3 syntax
    expect(() => gradient(['blue', 'red'], false as any)('abc')).toThrowError(
      'Expected `options` to be an `object`, got `boolean`',
    );
  });

  it('should throw an error if interpolation is not a string', () => {
    // Deprecated v2 syntax
    expect(() => gradient('blue', 'red')('abc', { interpolation: 1000 } as any)).toThrowError(
      'Expected `options.interpolation` to be `rgb` or `hsv`, got `number`',
    );
    // v3 syntax
    expect(() => gradient(['blue', 'red'], { interpolation: 1000 } as any)('abc')).toThrowError(
      'Expected `options.interpolation` to be `rgb` or `hsv`, got `number`',
    );
  });

  it('should throw an error if hsvSpin is not a string, but only if interpolation is HSV', () => {
    // Deprecated v2 syntax
    expect(() => gradient('blue', 'red')('abc', { hsvSpin: 42 } as any)).not.toThrow();
    expect(() => gradient('blue', 'red')('abc', { interpolation: 'hsv', hsvSpin: 42 } as any)).toThrowError(
      'Expected `options.hsvSpin` to be a `short` or `long`, got `number`',
    );
    // v3 syntax
    expect(() => gradient(['blue', 'red'], { hsvSpin: 42 } as any)('abc')).not.toThrow();
    expect(() => gradient(['blue', 'red'], { interpolation: 'hsv', hsvSpin: 42 } as any)('abc')).toThrowError(
      'Expected `options.hsvSpin` to be a `short` or `long`, got `number`',
    );
  });

  it('should work correctly with different gradient and interpolation options', () => {
    // Deprecated v2 syntax
    expect(gradient('blue', 'white', 'red')('abc')).not.toBe('abc');
    // v3 syntax
    expect(gradient('red', 'green')('abc', { interpolation: 'hsv' })).not.toBe('abc');

    describe('should generate red -> yellow -> green (short arc)', () => {
      // Deprecated v2 syntax
      expect(gradient('red', 'green')('abc')).not.toBe(gradient('red', 'green')('abc', { interpolation: 'hsv' }));
      // v3 syntax
      expect(gradient(['red', 'green'])('abc')).not.toBe(gradient(['red', 'green'], { interpolation: 'hsv' })('abc'));
    });

    describe('should generate red -> blue -> green (long arc)', () => {
      // Deprecated v2 syntax
      expect(gradient('red', 'green')('abc')).not.toBe(
        gradient('red', 'green')('abc', { interpolation: 'hsv', hsvSpin: 'long' }),
      );
      // v3 syntax
      expect(gradient(['red', 'green'])('abc')).not.toBe(
        gradient(['red', 'green'], { interpolation: 'hsv', hsvSpin: 'long' })('abc'),
      );
    });

    // Deprecated v2 syntax
    expect(gradient('red', 'green')('abc', { interpolation: 'hsv' })).not.toBe(
      gradient('red', 'green')('abc', { interpolation: 'hsv', hsvSpin: 'long' }),
    );
    // v3 syntax
    expect(gradient(['red', 'green'], { interpolation: 'hsv' })('abc')).not.toBe(
      gradient(['red', 'green'], { interpolation: 'hsv', hsvSpin: 'long' })('abc'),
    );
  });

  it('should support varargs syntax exactly like array syntax, even if deprecated', () => {
    // Deprecated v2 syntax
    expect(gradient('yellow', 'green')('abc')).toBe(gradient(['yellow', 'green'])('abc'));
  });

  it('should support aliases', () => {
    // Deprecated v2 syntax
    expect(cristal('Hello world')).toBe(gradient('#bdfff3', '#4ac29a')('Hello world'));
    expect(pastel('Hello world')).toBe(
      gradient('#74ebd5', '#74ecd5')('Hello world', { interpolation: 'hsv', hsvSpin: 'long' }),
    );

    // v3 syntax
    expect(cristal('Hello world')).toBe(gradient(['#bdfff3', '#4ac29a'])('Hello world'));
    expect(pastel('Hello world')).toBe(
      gradient(['#74ebd5', '#74ecd5'], { interpolation: 'hsv', hsvSpin: 'long' })('Hello world'),
    );
  });

  it('should have aliases registered in gradient object, even if deprecated', () => {
    // Deprecated v2 syntax
    expect(gradient.cristal('Hello world')).toBe(cristal('Hello world'));
    expect(gradient.pastel('Hello world')).toBe(pastel('Hello world'));
  });

  it('multiline option should work the same way on one-line strings', () => {
    // Deprecated v2 syntax
    expect(gradient('blue', 'white', 'red').multiline('abc')).toBe(gradient('blue', 'white', 'red')('abc'));
    expect(gradient('red', 'green').multiline('abc', { interpolation: 'hsv' })).toBe(
      gradient('red', 'green')('abc', { interpolation: 'hsv' }),
    );

    // v3 syntax
    expect(gradient(['blue', 'white', 'red']).multiline('abc')).toBe(gradient(['blue', 'white', 'red'])('abc'));
    expect(gradient(['red', 'green']).multiline('abc', { interpolation: 'hsv' })).toBe(
      gradient(['red', 'green'])('abc', { interpolation: 'hsv' }),
    );
  });

  it('multiline option should work correctly', () => {
    // Deprecated v2 syntax
    expect(gradient('orange', 'purple').multiline('hello\nworld')).toBe(
      gradient('orange', 'purple')('hello') + '\n' + gradient('orange', 'purple')('world'),
    );
    expect(gradient.atlas.multiline('abc\n\ndef')).toBe(gradient.atlas('abc') + '\n\n' + gradient.atlas('def'));
    expect(gradient.rainbow.multiline('hi\nworld')).not.toBe(gradient.rainbow('hi') + '\n' + gradient.rainbow('world'));

    // v3 syntax
    expect(gradient(['orange', 'purple']).multiline('hello\nworld')).toBe(
      gradient(['orange', 'purple'])('hello') + '\n' + gradient(['orange', 'purple'])('world'),
    );
    expect(atlas.multiline('abc\n\ndef')).toBe(atlas('abc') + '\n\n' + atlas('def'));
    expect(rainbow.multiline('hi\nworld')).not.toBe(rainbow('hi') + '\n' + rainbow('world'));
  });

  it('case-insensitive options should work correctly', () => {
    // Deprecated v2 syntax
    expect(gradient('red', 'green')('abc', { interpolation: 'hsv', hsvSpin: 'long' })).toBe(
      gradient('red', 'green')('abc', { interpolation: 'HSV' as any, hsvSpin: 'Long' as any }),
    );

    // v3 syntax
    expect(gradient(['red', 'green'], { interpolation: 'hsv', hsvSpin: 'long' })('abc')).toBe(
      gradient(['red', 'green'], { interpolation: 'HSV' as any, hsvSpin: 'Long' as any })('abc'),
    );
  });

  it('should always return the same result for the same input', () => {
    expect(gradient(['red', 'green', 'blue'])('Lorem Ipsum! ')).toMatchSnapshot();
    expect(
      gradient(['red', 'green'], {
        interpolation: 'hsv',
        hsvSpin: 'short',
      })('Lorem Ipsum'),
    ).toMatchSnapshot();
    expect(
      gradient(['cyan', 'yellow', 'magenta'], {
        interpolation: 'hsv',
        hsvSpin: 'long',
      })('Lorem Ipsum'),
    ).toMatchSnapshot();
    expect(gradient.atlas.multiline('Lorem\n\nIpsum')).toMatchSnapshot();
  });
});
