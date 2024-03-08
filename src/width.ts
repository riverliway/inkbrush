import { Spline } from './spline'
import { Coord, add, normalize, scale, subtract } from './vector'
import { alterBezierPoints, calculateBezierPoints } from './bezier'

const DEFAULT_WIDTH = 1

interface StrokeWidth {
  breakpoint: number
  strokeWidth: number
}

export interface Curve {
  points: Coord[]
  bezierPoints: Coord[]
  strokeWidths?: StrokeWidth[]
}

/**
 * Calculates the outside curves that define the width of the inkbrush
 * @param middleCurve - the middle curve to calculate the edge curves for
 * @returns the outside curves
 */
export const calculateEdgeCurves = (middleCurve: Curve, bend: number): [Curve, Curve] => {
  const strokeWidths = interpolateWidths(middleCurve)
  const edge1: Curve = { points: [], bezierPoints: [] }
  const edge2: Curve = { points: [], bezierPoints: [] }

  for (let i = 0; i < middleCurve.points.length; i++) {
    const p = middleCurve.points[i]
    const b = i === middleCurve.points.length - 1 ? middleCurve.bezierPoints[i - 1]  : middleCurve.bezierPoints[i]
    const w = strokeWidths[i]

    const normal = scale(normalize({
      x: b.y - p.y,
      y: p.x - b.x
    }), i === middleCurve.points.length - 1 ? -1 : 1)

    edge1.points.push(add(p, scale(normal, w)))
    edge2.points.push(subtract(p, scale(normal, w)))
  }

  edge1.bezierPoints = calculateBezierPoints(edge1.points, bend)
  edge2.bezierPoints = calculateBezierPoints(edge2.points, bend)
  edge1.bezierPoints = alterBezierPoints(middleCurve, edge1)
  edge2.bezierPoints = alterBezierPoints(middleCurve, edge2)

  return [edge1, edge2]
}

/**
 * Calculates the stroke widths for the inkbrush at every point
 * @param middleCurve - the middle curve
 * @returns the stroke widths for the inkbrush (len = middleCurve.points.length)
 */
const interpolateWidths = (middleCurve: Curve): number[] => {
  const widths = middleCurve.strokeWidths?.filter(isValidStrokeWidth)
  if (!widths?.length) {
    return Array(middleCurve.points.length).fill(DEFAULT_WIDTH)
  } else if (widths.length === 1) {
    return Array(middleCurve.points.length).fill(widths[0].strokeWidth)
  }

  const spline = new Spline(widths.map(w => w.breakpoint), widths.map(w => w.strokeWidth))

  const distances = middleCurve.points.map((p, i) => {
    if (i === 0) {
      return 0
    }

    const prev = middleCurve.points[i - 1]
    return Math.hypot(p.x - prev.x, p.y - prev.y)
  })

  const totalDistances = distances.map((_, i) => distances.slice(0, i + 1).reduce((a, b) => a + b, 0))

  return totalDistances.map(d => spline.at(d / totalDistances[totalDistances.length - 1]))
}

/**
 * @param strokeWidth - the stroke width to validate
 * @returns whether the stroke width is valid
 */
const isValidStrokeWidth = (strokeWidth: StrokeWidth): boolean => {
  if (strokeWidth.breakpoint < 0 || strokeWidth.breakpoint > 1) {
    return false
  }

  if (isNaN(strokeWidth.strokeWidth) || !isFinite(strokeWidth.strokeWidth) || strokeWidth.strokeWidth < 0) {
    return false
  }

  return true
}
