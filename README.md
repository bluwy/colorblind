# Colorblind

[![NPM badge](https://img.shields.io/npm/v/@bjornlu/colorblind)](https://www.npmjs.com/package/@bjornlu/colorblind)
[![jsDelivr badge](https://data.jsdelivr.com/v1/package/npm/@bjornlu/colorblind/badge)](https://www.jsdelivr.com/package/npm/@bjornlu/colorblind)

A zero-dependencies color blindness simulation library.

It is based on the [color blindness simulation research](https://ixora.io/projects/colorblindness/color-blindness-simulation-research/) and its [Processing library](https://github.com/hx2A/ColorBlindness) by [hx2A](https://github.com/hx2A).

[Demo](https://bluwy.github.io/colorblind)

## Install

```bash
$ npm install @bjornlu/colorblind
```

or use jsDelivr CDN for direct browser usage:

```html
<script src="https://cdn.jsdelivr.net/npm/@bjornlu/colorblind@1.0.1/dist/colorblind.min.js"></script>
```

The CDN version sets a global `colorblind` object which holds the functions below, e.g. `colorblind.simulate(rgb, deficiency)`.

## Usage

The library exports one main function:

**`simulate(rgb: RGB, deficiency: Deficiency): RGB`**

Simulates a color with applied color blindness deficiency.

`rgb` is an object with keys `r`, `g` and `b` with values between 0 and 255.

`deficiency` can be one of `protanopia`, `deuteranopia`, `tritanopia` or `achromatopsia`.

Example:

```js
import { simulate } from '@bjornlu/colorblind'

simulate({ r: 120, g: 50, b: 30 }, 'protanopia')
// => { r: 61.93899039184746, g: 61.93898965670619, b: 29.683799575796723 }
```

There's also two functions for extra customization:

**`simulateDichromatic(rgb: RGB, simMatrix: Array<number>): RGB`**

**`simulateMonochromatic(rgb: RGB, simMatrix: Array<number>): RGB`**

`simulateDichromatic` accepts a simulation matrix represented as an array of 9 numbers, while `simulateMonochromatic` accepts array of 3 numbers.

Check out the [research](https://ixora.io/projects/colorblindness/color-blindness-simulation-research/) for how to calculate simulation matrices.

## Additional Notes

- The library makes no assumption of the color's gamma, hence gamma correction must be applied or removed manually where needed.
- The algorithm does not use daltonization to calculate the result values.

## Contributing

PRs are welcomed for any typos or documentation issues. Edits on the simulation algorithm must be backed up with research and is preferred to be discussed in an issue first.

## Prior Research

The library was actually planned to be a rewrite of [color-blind](https://github.com/skratchdot/color-blind) to remove the [onecolor](https://github.com/One-com/one-color) dependency and to add typings. In the process of understanding how the code works, I found that the [original reference](https://galactic.ink/sphere/js/Color.Blind.js) was outdated and has a [newer version](https://galactic.ink/labs/Color-Vision/Javascript/Color.Vision.Simulate.js).

I also found out about the [LMS version](https://galactic.ink/labs/Color-Vision/Javascript/Color.Vision.Daltonize.js) of the daltonize implementation, which happens to be the same technique used in the [color blindness simulation research](https://ixora.io/projects/colorblindness/color-blindness-simulation-research/). The only difference was the simulation matrix used for the color deficiencies and its post color correction calculations.

I finally decided to follow the algorithm from the research since it's the only source I found that backs up how the values were calculated. So this means that this library does not use daltonization to calculate the colors.

Since I'm no expert in this field, I would highly appreciate validation on the implementation and whether daltonization would be the better choice.

## License

MIT
