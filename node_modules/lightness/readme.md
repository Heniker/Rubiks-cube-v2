# lightness
[![NPM](https://nodei.co/npm/lightness.png)](https://nodei.co/npm/lightness/)

Lighten or darken a css color (similar to less.css lighten() and darken())

The second parameter is the absolute percentage value to add to the color.

## usage

```js
var lightness = require('lightness')

lightness('#000000', 100) // #ffffff
lightness('#ffffff', -100) // #000000
lightness('blue', 10) // #3333FF

```