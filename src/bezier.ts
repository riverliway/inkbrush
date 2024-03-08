import { Coord, locateIntersection, locateMidpoint } from './vector'
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
    
    bezierPoints.push({
      x: 2 * p.x - b.x,
      y: 2 * p.y - b.y
    })
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

  const offset = {
    x: midpoint.x - p1.x,
    y: midpoint.y - p1.y
  }

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

    const strokeWidth1 = Math.hypot(middleP1.x - edgeP1.x, middleP1.y - edgeP1.y)
    const strokeWidth2 = Math.hypot(middleP2.x - edgeP2.x, middleP2.y - edgeP2.y)
    const strokeWidth = (strokeWidth1 + strokeWidth2) / 2

    const middleDist = Math.hypot(middleP1.x - intersection.x, middleP1.y - intersection.y)
    const edgeDist = Math.hypot(edgeP1.x - intersection.x, edgeP1.y - intersection.y)
    const direction = middleDist > edgeDist ? 1 : -1

    const normal = {
      x: intersection.x - middleB.x,
      y: intersection.y - middleB.y,
    }
    const normalDist = Math.hypot(normal.x, normal.y)
    normal.x /= normalDist
    normal.y /= normalDist

    return {
      x: middleB.x + normal.x * strokeWidth * direction,
      y: middleB.y + normal.y * strokeWidth * direction
    }
  })
}
