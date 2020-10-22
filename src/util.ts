import { LMS, RGB } from './types'

// prettier-ignore
const rgbToLmsMatrix = [
  0.31399022, 0.63951294, 0.04649755,
  0.15537241, 0.75789446, 0.08670142,
  0.01775239, 0.10944209, 0.87256922,
]

// prettier-ignore
const lmsToRgbMatrix = [
  5.47221206, -4.6419601, 0.16963708,
  -1.1252419, 2.29317094, -0.1678952,
  0.02980165, -0.19318073, 1.16364789,
]

export function multiplyMatrix3x3And3x1(a: Array<number>, b: Array<number>) {
  return [
    a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    a[3] * b[0] + a[4] * b[1] + a[5] * b[2],
    a[6] * b[0] + a[7] * b[1] + a[8] * b[2],
  ]
}

export function multiplyMatrix3x1And3x1(a: Array<number>, b: Array<number>) {
  return [a[0] * b[0] + a[1] * b[1] + a[2] * b[2]]
}

export function convertRgbToLms(rgb: RGB) {
  const rgbMatrix = convertRgbToMatrix(rgb)
  const lmsMatrix = multiplyMatrix3x3And3x1(rgbToLmsMatrix, rgbMatrix)
  const lms = convertMatrixToLms(lmsMatrix)

  return lms
}

export function convertLmsToRgb(lms: LMS) {
  const lmsMatrix = convertLmsToMatrix(lms)
  const rgbMatrix = multiplyMatrix3x3And3x1(lmsToRgbMatrix, lmsMatrix)
  const rgb = convertMatrixToRgb(rgbMatrix)

  return rgb
}

export function convertRgbToMatrix(rgb: RGB) {
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255]
}

export function convertLmsToMatrix(lms: LMS) {
  return [lms.l, lms.m, lms.s]
}

export function convertMatrixToRgb(m: Array<number>): RGB {
  return { r: m[0] * 255, g: m[1] * 255, b: m[2] * 255 }
}

export function convertMatrixToLms(m: Array<number>): LMS {
  return { l: m[0], m: m[1], s: m[2] }
}

export function clampRgb(rgb: RGB): RGB {
  return {
    r: clamp(rgb.r, 0, 255),
    g: clamp(rgb.g, 0, 255),
    b: clamp(rgb.b, 0, 255),
  }
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}
