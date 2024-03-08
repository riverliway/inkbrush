# inkbrush
A NPM package for generating traditional inkbrush style SVG paths.

## Installation

```
npm i inkbrush
```

## Usage

Simply call the exported function with your parameters. It returns an SVG path. Either write it to file inside an SVG or use it in a frontend environment.

```typescript
import { generateInkbrush } from 'inkbrush'

const svgInkbrushPath = generateInkbrush({
    viewbox,
    points: [
      { x: 253.685, y: 98.026 },
      { x: 496.162, y: 269.186 },
      { x: 321.248, y: 430.587 }
    ],
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
```

