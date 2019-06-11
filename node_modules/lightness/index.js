var colorString = require('color-string')
var parse = require('parse-color')
var convert = require('color-convert')()

module.exports = function (color, change) {
  var hsla = parse(color).hsla
  hsla[2] += change
  hsla[2] = Math.min(100, Math.max(0, hsla[2]))

  if(hsla[3] === 1) return colorString.hexString(convert.hsl(hsla).rgb())
  return colorString.hslaString(hsla)
}