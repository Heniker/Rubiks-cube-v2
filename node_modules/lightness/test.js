var lightness = require('./')

console.log(lightness('#000000', 100))
console.log(lightness('#ffffff', -100))
console.log(lightness('rgba(0,0,0,0.5)', +100))
console.log(lightness('blue', 10))