import chalk from 'chalk';
import tinygradient, { StopInput, Instance as TinyGradient, ArcMode } from 'tinygradient';
import { ColorInput, Instance as TinyColor } from 'tinycolor2';

interface GradientOptions {
  interpolation?: 'rgb' | 'hsv';
  hsvSpin?: 'short' | 'long';
}

interface GradientFunction {
  (str: string): string;
  multiline: MultiLineGradientFunction;

  /**
   *  @deprecated
   *  Pass options like this instead: myGradient = gradient(['red', 'blue'], options)
   */
  (str: string, opts?: GradientOptions): string;
}

interface MultiLineGradientFunction {
  (str: string): string;

  /**
   * @deprecated
   * Pass options like this instead: gradient(['red', 'blue'], options).multiline('...')
   */
  (str: string, opts?: GradientOptions): string;
}

interface AliasGradientFunction {
  (str: string): string;
  multiline: (str: string) => string;
}

interface GradientCreator {
  (...colors: [ColorInput[] | StopInput[], GradientOptions?]): GradientFunction;

  /**
   * @deprecated
   * Pass your colors in an array, like this: myGradient = gradient(['red', 'blue'], options)
   */
  (...colors: (ColorInput | StopInput | GradientOptions)[]): GradientFunction;

  /** @deprecated Use import { atlas } from 'gradient-string' instead */
  atlas: AliasGradientFunction;
  /** @deprecated Use import { cristal } from 'gradient-string' instead */
  cristal: AliasGradientFunction;
  /** @deprecated Use import { teen } from 'gradient-string' instead */
  teen: AliasGradientFunction;
  /** @deprecated Use import { mind } from 'gradient-string' instead */
  mind: AliasGradientFunction;
  /** @deprecated Use import { morning } from 'gradient-string' instead */
  morning: AliasGradientFunction;
  /** @deprecated Use import { vice } from 'gradient-string' instead */
  vice: AliasGradientFunction;
  /** @deprecated Use import { passion } from 'gradient-string' instead */
  passion: AliasGradientFunction;
  /** @deprecated Use import { fruit } from 'gradient-string' instead */
  fruit: AliasGradientFunction;
  /** @deprecated Use import { instagram } from 'gradient-string' instead */
  instagram: AliasGradientFunction;
  /** @deprecated Use import { retro } from 'gradient-string' instead */
  retro: AliasGradientFunction;
  /** @deprecated Use import { summer } from 'gradient-string' instead */
  summer: AliasGradientFunction;
  /** @deprecated Use import { rainbow } from 'gradient-string' instead */
  rainbow: AliasGradientFunction;
  /** @deprecated Use import { pastel } from 'gradient-string' instead */
  pastel: AliasGradientFunction;
}

const gradient: GradientCreator = (...colors) => {
  let gradient: TinyGradient;
  let options: GradientOptions;

  if (colors.length === 0) {
    throw new Error('Missing gradient colors');
  }

  if (!Array.isArray(colors[0])) {
    // Deprecated varargs syntax
    if (colors.length === 1) {
      throw new Error(`Expected an array of colors, received ${JSON.stringify(colors[0])}`);
    }
    gradient = tinygradient(...(colors as ColorInput[]));
  }
  // New syntax: (colors[], options)
  else {
    gradient = tinygradient(colors[0] as ColorInput[]);
    options = validateOptions(colors[1] as GradientOptions);
  }

  const fn: GradientFunction = (str, deprecatedOptions?) => {
    return applyGradient(str ? str.toString() : '', gradient, deprecatedOptions ?? options);
  };

  fn.multiline = (str, deprecatedOptions?) =>
    multiline(str ? str.toString() : '', gradient, deprecatedOptions ?? options);
  return fn;
};

const getColors = (gradient: TinyGradient, options: GradientOptions, count: number): TinyColor[] => {
  return options.interpolation?.toLowerCase() === 'hsv'
    ? gradient.hsv(count, (options.hsvSpin?.toLowerCase() as ArcMode) || false)
    : gradient.rgb(count);
};

function applyGradient(str: string, gradient: TinyGradient, opts?: GradientOptions): string {
  const options = validateOptions(opts);
  const colorsCount = Math.max(str.replace(/\s/g, '').length, gradient.stops.length);
  const colors: TinyColor[] = getColors(gradient, options, colorsCount);
  let result = '';

  for (const s of str) {
    result += s.match(/\s/g) ? s : chalk.hex(colors.shift()?.toHex() || '#000')(s);
  }

  return result;
}

export function multiline(str: string, gradient: TinyGradient, opts?: GradientOptions): string {
  const options = validateOptions(opts);
  const lines = str.split('\n');
  const maxLength = Math.max(...lines.map((l) => l.length), gradient.stops.length);
  const colors = getColors(gradient, options, maxLength);
  const results: string[] = [];

  for (const line of lines) {
    const lineColors = colors.slice(0);
    let lineResult = '';

    for (const l of line) {
      lineResult += chalk.hex(lineColors.shift()?.toHex() || '#000')(l);
    }

    results.push(lineResult);
  }

  return results.join('\n');
}

function validateOptions(opts?: GradientOptions): GradientOptions {
  const options: GradientOptions = { interpolation: 'rgb', hsvSpin: 'short', ...opts };

  if (opts !== undefined && typeof opts !== 'object') {
    throw new TypeError(`Expected \`options\` to be an \`object\`, got \`${typeof opts}\``);
  }

  if (typeof options.interpolation !== 'string') {
    throw new TypeError(
      `Expected \`options.interpolation\` to be \`rgb\` or \`hsv\`, got \`${typeof options.interpolation}\``,
    );
  }

  if (options.interpolation.toLowerCase() === 'hsv' && typeof options.hsvSpin !== 'string') {
    throw new TypeError(
      `Expected \`options.hsvSpin\` to be a \`short\` or \`long\`, got \`${typeof options.hsvSpin}\``,
    );
  }

  return options;
}

type GradientAlias = { colors: ColorInput[]; options: GradientOptions };
const aliases: Record<string, GradientAlias> = {
  atlas: { colors: ['#feac5e', '#c779d0', '#4bc0c8'], options: {} },
  cristal: { colors: ['#bdfff3', '#4ac29a'], options: {} },
  teen: { colors: ['#77a1d3', '#79cbca', '#e684ae'], options: {} },
  mind: { colors: ['#473b7b', '#3584a7', '#30d2be'], options: {} },
  morning: { colors: ['#ff5f6d', '#ffc371'], options: { interpolation: 'hsv' } },
  vice: { colors: ['#5ee7df', '#b490ca'], options: { interpolation: 'hsv' } },
  passion: { colors: ['#f43b47', '#453a94'], options: {} },
  fruit: { colors: ['#ff4e50', '#f9d423'], options: {} },
  instagram: { colors: ['#833ab4', '#fd1d1d', '#fcb045'], options: {} },
  retro: {
    colors: ['#3f51b1', '#5a55ae', '#7b5fac', '#8f6aae', '#a86aa4', '#cc6b8e', '#f18271', '#f3a469', '#f7c978'],
    options: {},
  },
  summer: { colors: ['#fdbb2d', '#22c1c3'], options: {} },
  rainbow: { colors: ['#ff0000', '#ff0100'], options: { interpolation: 'hsv', hsvSpin: 'long' } },
  pastel: { colors: ['#74ebd5', '#74ecd5'], options: { interpolation: 'hsv', hsvSpin: 'long' } },
};

function gradientAlias(alias: GradientAlias): AliasGradientFunction {
  const result = (str: string) => gradient(...alias.colors)(str, alias.options);
  result.multiline = (str = '') => gradient(...alias.colors).multiline(str, alias.options);
  return result;
}

export default gradient;

export const atlas = gradientAlias(aliases.atlas);
export const cristal = gradientAlias(aliases.cristal);
export const teen = gradientAlias(aliases.teen);
export const mind = gradientAlias(aliases.mind);
export const morning = gradientAlias(aliases.morning);
export const vice = gradientAlias(aliases.vice);
export const passion = gradientAlias(aliases.passion);
export const fruit = gradientAlias(aliases.fruit);
export const instagram = gradientAlias(aliases.instagram);
export const retro = gradientAlias(aliases.retro);
export const summer = gradientAlias(aliases.summer);
export const rainbow = gradientAlias(aliases.rainbow);
export const pastel = gradientAlias(aliases.pastel);

// Deprecated exports
gradient.atlas = atlas;
gradient.cristal = cristal;
gradient.teen = teen;
gradient.mind = mind;
gradient.morning = morning;
gradient.vice = vice;
gradient.passion = passion;
gradient.fruit = fruit;
gradient.instagram = instagram;
gradient.retro = retro;
gradient.summer = summer;
gradient.rainbow = rainbow;
gradient.pastel = pastel;
