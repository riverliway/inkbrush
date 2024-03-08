import { Coord, add, distance, locateMidpoint, normalize, reflect, scale, subtract } from './vector'
import { Curve } from './width'

/**
 * Encodes the given points into an SVG path
 * @param edge1 - the first edge curve
 * @param edge2 - the second edge curve
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string
 */
export const toPath = (edge1: Curve, edge2: Curve, precision: number): string => {
  const path = [move(edge1.points[0], precision)]

  for (let i = 1; i < edge1.points.length; i++) {
    path.push(bezier(edge1.bezierPoints[i - 1], edge1.points[i], precision))
  }

  // If the two ends are not the same, we need to add a rounded edge to connect them
  const end1 = edge1.points[edge1.points.length - 1]
  const end2 = edge2.points[edge2.points.length - 1]
  const endDist = distance(end1, end2)
  if (endDist > Math.pow(10, -precision)) {
    // const midpoint = locateMidpoint(end1, end2)
    // const normal = normalize(reflect(subtract(end1, end2)))

    // path.push(bezier(add(midpoint, scale(normal, endDist / 2)), end2, precision))
    path.push(halfCircle(end2, precision))
  }

  for (let i = edge2.points.length - 2; i >= 0; i--) {
    path.push(bezier(edge2.bezierPoints[i], edge2.points[i], precision))
  }

  // If the two ends are not the same, we need to add a rounded edge to connect them
  const start1 = edge1.points[0]
  const start2 = edge2.points[0]
  const startDist = distance(start1, start2)
  if (startDist > Math.pow(10, -precision)) {
    path.push(halfCircle(start1, precision))
  }

  return path.join(' ')
}

/**
 * @param coord - the coordinate to move to
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a move
 */
const move = (coord: Coord, precision: number): string => {
  return `M ${toString(coord.x, precision)} ${toString(coord.y, precision)}`
}

/**
 * @param control - the control point
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a bezier curve
 */
const bezier = (control: Coord, destination: Coord, precision: number): string => {
  return `Q ${toString(control.x, precision)} ${toString(control.y, precision)} ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a half circle
 */
const halfCircle = (destination: Coord, precision: number): string => {
  return `A 1 1 0 0 1 ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * Stringifies a number to a string with the given precision
 * @param num - the number to stringify
 * @param precision - the precision to stringify the number to
 * @returns the stringified number
 */
const toString = (num: number, precision: number): string => {
  let str = num.toFixed(precision)
  while (str.endsWith('0')) {
    str = str.slice(0, -1)
  }

  return str.endsWith('.') ? str.slice(0, -1) : str
}

