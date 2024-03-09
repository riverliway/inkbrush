import { calculateBezierPoints } from './bezier'
import { calculateEdgeCurves } from './width'
import { toPath } from './createPath'
import { Coord } from './vector'

const DEFAULT_BEND = 1
const DEFAULT_PRECISION = 3

export interface InkbrushParams {
  /**
   * The points indicating the path of the inkbrush
   */
  points: Coord[]
  /**
   * The stroke widths for the inkbrush.
   * This is an array of objects, each with a breakpoint and a strokeWidth.
   * The breakpoint indicates the point at which the strokeWidth should change.
   * The breakpoints should all be between 0 and 1, and should be in increasing order.
   * The strokeWidth indicates the width of the stroke at the given breakpoint.
   * The actual width of the stroke is calculated by interpolating between the given breakpoints.
   */
  strokeWidths?: Array<{
    breakpoint: number
    strokeWidth: number
  }>
  /**
   * The spike generation parameters for the ends of the curve.
   */
  end: {
    numSpikes: number
    minSpikeSize: number
    maxSpikeSize: number
  }
  /**
   * The amount of bend in the curve.
   * This is a multiplier for the natural bend that already exists in the curve.
   * A value of 0 indicates very little bend,
   * a value of 1 indicates a decent amount of bend,
   * and a value above 1 indicates a lot of bend.
   * 
   * The sign of the value indicates the direction of the bend.
   * A positive value indicates a bend outwards from the center of the curve, if the curve is traveling clockwise.
   * A negative value indicates a bend inwards towards the center of the curve, if the curve is traveling clockwise.
   *
   * This value has a strong impact on curves with a small number of points,
   * but has a weaker impact on curves with a large number of points. 
   * @default 1
   */
  bend?: number
  /**
   * The precision of the numbers in the generated inkbrush.
   * @default 3
   */
  precision?: number
}

/**
 * Generates an SVG path string representing the inkbrush stroke.
 * The process is mostly determinstic, but the stipple generation is random.
 * @param inkbrush - the parameters for the inkbrush
 * @returns the SVG path string
 */
export const generateInkbrush = (inkbrush: InkbrushParams): string => {
  if (inkbrush.points.length < 2) {
    return ''
  }

  const bend = validateNumber(inkbrush.bend, DEFAULT_BEND)
  const precision = validateNumber(inkbrush.precision, DEFAULT_PRECISION)

  const bezierPoints = calculateBezierPoints(inkbrush.points, bend)
  const [edge1, edge2] = calculateEdgeCurves({ points: inkbrush.points, bezierPoints, strokeWidths: inkbrush.strokeWidths }, bend)

  return toPath(edge1, edge2, precision)
}

/**
 * @param num - the number to validate
 * @param defaultNum - the default number to use if the given number is invalid
 * @returns the validated number
 */
const validateNumber = (num: number | undefined | null, defaultNum: number): number => {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) {
    return defaultNum
  }

  return num
}

export * as svg from './svg'
export * as vector from './vector'
