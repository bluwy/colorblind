import { RGB } from './types'
import {
  protanopiaSim,
  deuteranopiaSim,
  tritanopiaSim,
  achromatopsiaSim,
} from './sim-matrix'
import {
  convertLmsToMatrix,
  convertLmsToRgb,
  convertMatrixToLms,
  convertMatrixToRgb,
  convertRgbToLms,
  convertRgbToMatrix,
  multiplyMatrix3x1And3x1,
  multiplyMatrix3x3And3x1,
  sanitizeRgb,
} from './util'

export type Deficiency =
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia'

export function simulate(rgb: RGB, deficiency: Deficiency) {
  switch (deficiency) {
    case 'protanopia':
      return simulateDichromatic(rgb, protanopiaSim)
    case 'deuteranopia':
      return simulateDichromatic(rgb, deuteranopiaSim)
    case 'tritanopia':
      return simulateDichromatic(rgb, tritanopiaSim)
    case 'achromatopsia':
      return simulateMonochromatic(rgb, achromatopsiaSim)
    default:
      throw new Error('Invalid color deficiency provided')
  }
}

export function simulateDichromatic(rgb: RGB, simMatrix: Array<number>) {
  const lms = convertRgbToLms(sanitizeRgb(rgb))
  const lmsMatrix = convertLmsToMatrix(lms)
  const simLmsMatrix = multiplyMatrix3x3And3x1(simMatrix, lmsMatrix)
  const simLms = convertMatrixToLms(simLmsMatrix)
  const simRgb = convertLmsToRgb(simLms)

  return sanitizeRgb(simRgb)
}

export function simulateMonochromatic(rgb: RGB, simMatrix: Array<number>) {
  const rgbMatrix = convertRgbToMatrix(sanitizeRgb(rgb))
  const simRgbValue = multiplyMatrix3x1And3x1(rgbMatrix, simMatrix)[0]
  const simRgbMetrix = Array(3).fill(simRgbValue)
  const simRgb = convertMatrixToRgb(simRgbMetrix)

  return sanitizeRgb(simRgb)
}
