# Colorblind

[![package version](https://img.shields.io/npm/v/@bjornlu/colorblind)](https://www.npmjs.com/package/@bjornlu/colorblind)
[![npm downloads](https://img.shields.io/npm/dm/@bjornlu/colorblind)](https://www.npmjs.com/package/@bjornlu/colorblind)

A zero-dependencies color blindness simulation library.

It is based on the [color blindness simulation research](https://ixora.io/projects/colorblindness/color-blindness-simulation-research/) and its [Processing library](https://github.com/hx2A/ColorBlindness) by [hx2A](https://github.com/hx2A).

[**Demo**](https://bluwy.github.io/colorblind)

## Install

```bash
$ npm install @bjornlu/colorblind
```

or with CDN for direct browser usage, such as:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@bjornlu/colorblind"></script>

<!-- unpkg -->
<script src="https://unpkg.com/@bjornlu/colorblind>"></script>
```

The CDN version sets a global `colorblind` object, e.g. `colorblind.simulate(...)`.

## Usage

```js
import { simulate } from '@bjornlu/colorblind'

simulate({ r: 120, g: 50, b: 30 }, 'protanopia')
// => { r: 62, g: 62, b: 30 }
```

The color deficiency can be set to:

| Deficiency        | Description |
| ----------------- | ----------- |
| `'protanopia'`    | No red      |
| `'deuteranopia'`  | No green    |
| `'tritanopia'`    | No blue     |
| `'achromatopsia'` | No color    |

## Advanced

The library also exports two functions:

1. `simulateDichromatic(rgb: RGB, simMatrix: Array<number>): RGB`
2. `simulateMonochromatic(rgb: RGB, simMatrix: Array<number>): RGB`

You would almost never used this unless you need to perform custom color simulation.

`simulateDichromatic()` accepts a simulation matrix represented as an array of 9 numbers, while `simulateMonochromatic()` accepts array of 3 numbers.

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
