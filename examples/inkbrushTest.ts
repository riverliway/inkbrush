import { generateInkbrush } from '../src/index'
import { writeSvg } from './writeSvg'

const threeHumps = [
  { x: 100.183, y: 248.847 },
  { x: 111.815, y: 221.351 },
  { x: 135.593, y: 214.367 },
  { x: 146.219, y: 237.296 },
  { x: 159.925, y: 265.286 }, 
  { x: 185.65, y: 262.806 }, 
  { x: 206.961, y: 252.827 }, 
  { x: 221.913, y: 268.385 },
  { x: 250.118, y: 280.163 },
  { x: 273.984, y: 260.947 }, 
  { x: 295.68, y: 233.362 },
  { x: 335.353, y: 281.713 }
]

const cresent = [
  { x: 253.685, y: 98.026 },
  { x: 496.162, y: 269.186 },
  { x: 321.248, y: 430.587 }
]

const test = (): void => {
  const viewbox = {
    x: 0,
    y: 0,
    width: 1000,
    height: 500
  }

  const path = generateInkbrush({
    viewbox,
    points: threeHumps,
    strokeWidths: [{
      breakpoint: 0,
      strokeWidth: 1
    }, {
      breakpoint: 0.5,
      strokeWidth: 10
    }, {
      breakpoint: 1,
      strokeWidth: 1
    }],
    end: {
      numSpikes: 10,
      maxSpikeSize: 1,
      minSpikeSize: 1
    },
    bend: 0.5
  })

  writeSvg('test.svg', path, viewbox)
}

test()
