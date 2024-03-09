import { bezier, halfCircle, move } from './svg'
import { distance } from './vector'
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
    path.push(halfCircle(end1, end2, precision))
  }

  for (let i = edge2.points.length - 2; i >= 0; i--) {
    path.push(bezier(edge2.bezierPoints[i], edge2.points[i], precision))
  }

  // If the two ends are not the same, we need to add a rounded edge to connect them
  const start1 = edge1.points[0]
  const start2 = edge2.points[0]
  const startDist = distance(start1, start2)
  if (startDist > Math.pow(10, -precision)) {
    path.push(halfCircle(start2, start1, precision))
  }

  return path.join(' ')
}
