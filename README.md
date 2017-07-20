# gradient-string

[![Build Status](https://travis-ci.org/bokub/gradient-string.svg?branch=master)](https://travis-ci.org/bokub/gradient-string)
[![npm](https://img.shields.io/npm/v/gradient-string.svg)](https://www.npmjs.com/package/gradient-string)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Beautiful gradients in terminal stdout

![gradient-string](http://i.imgur.com/CjukALo.png)


## Install

```
$ npm install --save gradient-string
```

## Usage

```javascript
const gradient = require('gradient-string');

console.log(gradient('cyan', 'pink')('Hello world!'));
```

### Initialize a gradient

```javascript
// Using varargs
let coolGradient = gradient('red', 'green', 'blue');

// Using array
let coolGradient = gradient(['#FF0000', '#00FF00', '#0000FF']);
```

The colors are parsed with TinyColor, [multiple formats are accepted](https://github.com/bgrins/TinyColor/blob/master/README.md#accepted-string-input).

```javascript
let coolGradient = gradient([
  tinycolor('#FFBB65'),       // tinycolor object
  {r: 0, g: 255, b: 0},       // RGB object
  {h: 240, s: 1, v: 1, a: 1}, // HSVa object
  'rgb(120, 120, 0)',         // RGB CSS string
  'gold'                      // named color
]);
```

You can check out more advanced usages of gradients in the [wiki](https://github.com/bokub/gradient-string/wiki/Advanced-gradients), such as custom color stops or color interpolation options. 

### Use a gradient

```javascript
let coolString = coolGradient('This is a string colored with gradient-string!');
console.log(coolString);
```

### Built-in gradients

#### Usage
```javascript
const gradient = require('gradient-string');

// Use the rainbow gradient
gradient.rainbow('I love gradient-strings!')
```
#### Available built-in gradients
![Themes](http://i.imgur.com/nzFb9I5.png)

## Dependencies

- [tinygradient](https://github.com/mistic100/tinygradient) - Generate gradients
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal


## License

MIT © [Boris K](https://github.com/bokub)
