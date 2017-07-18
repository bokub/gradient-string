# gradient-string

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Beautiful gradients in terminal stdout

## Install

```
$ npm install --save gradient-string
```

## Usage

```javascript
const gradient = require('gradient-string');
const log = console.log;

log(gradient('cyan', 'pink')('Hello world!'));
```

### Initialize a gradient

```javascript
// using varargs
let coolGradient = gradient('red', 'green', 'blue');

// using array
let coolGradient = gradient([ '#FF0000', '#00FF00', '#0000FF' ]);
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

You can also specify the position of each color stop (between `0` and `1`). If no position is specified, stops are distributed equidistantly.

```javascript
let coolGradient = gradient([
  {color: '#d8e0de', pos: 0},
  {color: '#255B53', pos: 0.8},
  {color: '#000000', pos: 1}
]);
```

### Use a gradient

```javascript
let coolString = coolGradient('This is a string colored with gradient-string!')
log(coolString);
```

## Dependencies

- [tinygradient](https://github.com/mistic100/tinygradient) - Generate gradients
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal


## License

MIT © [Boris K](https://github.com/bokub)
