import { add, subtract, scale, reflect, normalize, distance, magnitude, locateIntersection, locateMidpoint } from './vector'

describe('add', () => {
  test('adds two points', () => {
    expect(add({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 4, y: 6 })
  })

  test('adds two negative points', () => {
    expect(add({ x: -1, y: -2 }, { x: -3, y: -4 })).toEqual({ x: -4, y: -6 })
  })

  test('adds a negative point and a positive point', () => {
    expect(add({ x: -1, y: 2 }, { x: 3, y: -4 })).toEqual({ x: 2, y: -2 })
  })

  test('adds a point and the zero point', () => {
    expect(add({ x: 1, y: 2 }, { x: 0, y: 0 })).toEqual({ x: 1, y: 2 })
  })
})

describe('subtract', () => {
  test('subtracts two points', () => {
    expect(subtract({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: -2, y: -2 })
  })

  test('subtracts two negative points', () => {
    expect(subtract({ x: -1, y: -2 }, { x: -3, y: -4 })).toEqual({ x: 2, y: 2 })
  })

  test('subtracts a negative point and a positive point', () => {
    expect(subtract({ x: -1, y: 2 }, { x: 3, y: -4 })).toEqual({ x: -4, y: 6 })
  })

  test('subtracts a point and the zero point', () => {
    expect(subtract({ x: 1, y: 2 }, { x: 0, y: 0 })).toEqual({ x: 1, y: 2 })
  })
})

describe('scale', () => {
  test('scales a point', () => {
    expect(scale({ x: 1, y: 2 }, 3)).toEqual({ x: 3, y: 6 })
  })

  test('scales a negative point', () => {
    expect(scale({ x: -1, y: -2 }, 3)).toEqual({ x: -3, y: -6 })
  })

  test('scales the zero point', () => {
    expect(scale({ x: 0, y: 0 }, 3)).toEqual({ x: 0, y: 0 })
  })
})

describe('reflect', () => {
  test('reflects a point', () => {
    expect(reflect({ x: 1, y: 2 })).toEqual({ x: 2, y: 1 })
  })

  test('reflects a negative point', () => {
    expect(reflect({ x: -1, y: -2 })).toEqual({ x: -2, y: -1 })
  })

  test('reflects a point on the 45 degree line', () => {
    expect(reflect({ x: 1, y: 1 })).toEqual({ x: 1, y: 1 })
  })

  test('reflects the zero point', () => {
    expect(reflect({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
  })
})

describe('normalize', () => {
  test('normalizes a vector', () => {
    const result = normalize({ x: 3, y: 4 })
    expect(result.x).toBeCloseTo(3 / 5)
    expect(result.y).toBeCloseTo(4 / 5)
  })

  test('normalizes a negative vector', () => {
    const result = normalize({ x: -3, y: -4 })
    expect(result.x).toBeCloseTo(-3 / 5)
    expect(result.y).toBeCloseTo(-4 / 5)
  })

  test('normalizes the zero vector', () => {
    expect(normalize({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
  })
})

describe('distance', () => {
  test('calculates the distance between two points', () => {
    expect(distance({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeCloseTo(2.828, 3)
  })

  test('calculates the distance between two negative points', () => {
    expect(distance({ x: -1, y: -2 }, { x: -3, y: -4 })).toBeCloseTo(2.828, 3)
  })

  test('calculates the distance between a negative point and a positive point', () => {
    expect(distance({ x: -1, y: 2 }, { x: 3, y: -4 })).toBeCloseTo(7.211, 3)
  })

  test('calculates the distance between a point and the zero point', () => {
    expect(distance({ x: 1, y: 2 }, { x: 0, y: 0 })).toBeCloseTo(2.236, 3)
  })
})

describe('magnitude', () => {
  test('calculates the magnitude of a vector', () => {
    expect(magnitude({ x: 3, y: 4 })).toBeCloseTo(5)
  })

  test('calculates the magnitude of a negative vector', () => {
    expect(magnitude({ x: -3, y: -4 })).toBeCloseTo(5)
  })

  test('calculates the magnitude of the zero vector', () => {
    expect(magnitude({ x: 0, y: 0 })).toBe(0)
  })
})

describe('locateIntersection', () => {
  test('locates the intersection of two lines', () => {
    const result = locateIntersection({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 0 })
    expect(result).toEqual({ x: 0.5, y: 0.5 })
  })

  test('locates the intersection of two parallel lines', () => {
    const result = locateIntersection({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 2 })
    expect(result).toBeUndefined()
  })
})

describe('locateMidpoint', () => {
  test('locates the midpoint of two points', () => {
    const result = locateMidpoint({ x: 0, y: 0 }, { x: 1, y: 1 })
    expect(result).toEqual({ x: 0.5, y: 0.5 })
  })

  test('locates the midpoint of two negative points', () => {
    const result = locateMidpoint({ x: -1, y: -1 }, { x: -2, y: -2 })
    expect(result).toEqual({ x: -1.5, y: -1.5 })
  })

  test('locates the midpoint of a negative point and a positive point', () => {
    const result = locateMidpoint({ x: -1, y: 1 }, { x: 2, y: -2 })
    expect(result).toEqual({ x: 0.5, y: -0.5 })
  })
})
