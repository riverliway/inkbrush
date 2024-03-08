
export interface Coord {
  x: number
  y: number
}

/**
 * @param p1 - the first point
 * @param p2 - the second point
 * @returns the sum of the two points
 */
export const add = (p1: Coord, p2: Coord): Coord => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  }
}

/**
 * @param p1 - the first point
 * @param p2 - the second point
 * @returns the difference between the two points
 */
export const subtract = (p1: Coord, p2: Coord): Coord => {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  }
}

/**
 * @param p - the point to scale
 * @param scalar - the scalar to scale the point by
 * @returns the scaled point
 */
export const scale = (p: Coord, scalar: number): Coord => {
  return {
    x: p.x * scalar,
    y: p.y * scalar
  }
}

/**
 * @param p - the point to reflect
 * @returns the reflected point around the 45 degree line
 */
export const reflect = (p: Coord): Coord => {
  return {
    x: p.y,
    y: p.x
  }
}

/**
 * @param vector - the vector to normalize
 * @returns the normalized vector
 */
export const normalize = (vector: Coord): Coord => {
  const length = Math.hypot(vector.x, vector.y)

  if (length === 0) {
    return { x: 0, y: 0 }
  }

  return {
    x: vector.x / length,
    y: vector.y / length
  }
}

/**
 * @param p1 - the first point
 * @param p2 - the second point
 * @returns the distance between the two points
 */
export const distance = (p1: Coord, p2: Coord): number => {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y)
}

/**
 * @param vector - the vector to calculate the magnitude of
 * @returns the magnitude of the vector
 */
export const magnitude = (vector: Coord): number => {
  return Math.hypot(vector.x, vector.y)
}


/**
 * @param A - the first point of the first line
 * @param B - the second point of the first line
 * @param C - the first point of the second line
 * @param D - the second point of the second line
 * @returns the intersection point of the two lines, or undefined if the lines are parallel
 */
export const locateIntersection = (A: Coord, B: Coord, C: Coord, D: Coord): Coord | undefined => {
  const a1 = B.y - A.y
  const b1 = A.x - B.x
  const c1 = a1 * A.x + b1 * A.y
  
  const a2 = D.y - C.y
  const b2 = C.x - D.x
  const c2 = a2 * C.x + b2 * C.y
  
  const determinant = a1*b2 - a2*b1
  
  if (Math.abs(determinant) < 0.001) {
    // The lines are parallel
    return undefined
  } else {
    return {
      x: (b2 * c1 - b1 * c2) / determinant,
      y: (a1 * c2 - a2 * c1) / determinant
    }
  }
}

/**
 * @param A - The first point
 * @param B - The second point
 * @returns The midpoint of the two points
 */
export const locateMidpoint = (A: Coord, B: Coord): Coord => {
  return {
    x: (A.x + B.x) / 2,
    y: (A.y + B.y) / 2
  }
}

