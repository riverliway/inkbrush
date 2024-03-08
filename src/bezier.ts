import { Coord, add, distance, locateIntersection, locateMidpoint, normalize, scale, subtract } from './vector'
import { Curve } from './width'

/**
 * Calculates the bezier points for the given points and bend
 * @param points - the points to calculate the bezier points for
 * @param bend - the amount of bend in the curve
 * @returns the bezier points (n - 1)
 */
export const calculateBezierPoints = (points: Coord[], bend: number): Coord[] => {
  const bezierPoints = [calculateFirstControlPoint(points[0], points[1], bend)]

  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i]
    const b = bezierPoints[bezierPoints.length - 1]
    
    bezierPoints.push(subtract(scale(p, 2), b))
  }

  return bezierPoints
}

/**
 * @param p1 - the first point
 * @param p2 - the second point
 * @param bend - the amount of bend in the curve
 * @returns the first control point for the bezier curve
 */
const calculateFirstControlPoint = (p1: Coord, p2: Coord, bend: number): Coord => {
  const midpoint = locateMidpoint(p1, p2)
  const offset = subtract(midpoint, p1)

  return {
    x: midpoint.x + offset.y * bend,
    y: midpoint.y - offset.x * bend
  }
}

/**
 * Using the default bezier point algorithm does not work perfectly for the inkbrush.
 * So we need to alter the bezier points to make the inkbrush look better.
 * @param middle - the middle curve
 * @param edge - the edge curve
 * @returns the new bezier points
 */
export const alterBezierPoints = (middle: Curve, edge: Curve): Coord[] => {
  return edge.bezierPoints.map((_, i) => {
    const middleP1 = middle.points[i]
    const middleP2 = middle.points[i + 1]
    const middleB = middle.bezierPoints[i]
    const edgeP1 = edge.points[i]
    const edgeP2 = edge.points[i + 1]

    const intersection = locateIntersection(middleP1, edgeP1, middleP2, edgeP2)
    if (intersection === undefined) {
      // The lines are parallel, so we just use the midpoint as the bezier control
      return locateMidpoint(edgeP1, edgeP2)
    }

    const strokeWidth1 = distance(middleP1, edgeP1)
    const strokeWidth2 = distance(middleP2, edgeP2)
    const strokeWidth = (strokeWidth1 + strokeWidth2) / 2

    const middleDist = distance(middleP1, intersection)
    const edgeDist = distance(edgeP1, intersection)
    const direction = middleDist > edgeDist ? 1 : -1

    const normal = normalize(subtract(intersection, middleB))

    return add(middleB, scale(normal, strokeWidth * direction))
  })
}
