import { Coord, distance, locateMidpoint } from './vector'

/**
 * @param destination - the coordinate to move to
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a move
 */
export const move = (destination: Coord, precision: number): string => {
  return `M ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param destination - the coordinate to draw a line to
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a line
 */
export const line = (destination: Coord, precision: number): string => {
  return `L ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param destination - the coordinate to draw a vertical line to
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a vertical line
 */
export const verticalLine = (destination: number, precision: number): string => {
  return `V ${toString(destination, precision)}`
}

/**
 * @param destination - the coordinate to draw a horizontal line to
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a horizontal line
 */
export const horizontalLine = (destination: number, precision: number): string => {
  return `H ${toString(destination, precision)}`
}

/**
 * @param control1 - the first control point
 * @param control2 - the second control point
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a curve
 */
export const curve = (control1: Coord, control2: Coord, destination: Coord, precision: number): string => {
  return `C ${toString(control1.x, precision)} ${toString(control1.y, precision)} ${toString(control2.x, precision)} ${toString(control2.y, precision)} ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param control - the control point
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a shorthand curve
 */
export const shorthandCurve = (control: Coord, destination: Coord, precision: number): string => {
  return `S ${toString(control.x, precision)} ${toString(control.y, precision)} ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param control - the control point
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a bezier curve
 */
export const bezier = (control: Coord, destination: Coord, precision: number): string => {
  return `Q ${toString(control.x, precision)} ${toString(control.y, precision)} ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a shorthand bezier
 */
export const shorthandBezier = (destination: Coord, precision: number): string => {
  return `T ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param rx - the x radius
 * @param ry - the y radius
 * @param xAxisRotation - the x axis rotation
 * @param largeArcFlag - the large arc flag
 * @param sweepFlag - the sweep flag
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for an arc
 */
export const arc = (rx: number, ry: number, xAxisRotation: number, largeArcFlag: number, sweepFlag: number, destination: Coord, precision: number): string => {
  return `A ${toString(rx, precision)} ${toString(ry, precision)} ${toString(xAxisRotation, precision)} ${toString(largeArcFlag, precision)} ${toString(sweepFlag, precision)} ${toString(destination.x, precision)} ${toString(destination.y, precision)}`
}

/**
 * @param destination - the destination point
 * @param precision - the precision of the numbers in the SVG path
 * @returns the SVG path string for a half circle
 */
export const halfCircle = (from: Coord, destination: Coord, precision: number): string => {
  const radius = distance(destination, from) / 2
  return arc(radius, radius, 0, 1, 1, destination, precision)
}

/**
 * @returns the SVG path string for a direct line to the start
 */
export const close = (): string => {
  return 'Z'
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

