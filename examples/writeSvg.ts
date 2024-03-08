import { writeFileSync } from 'fs'
import { Viewbox } from '../src/index'

/**
 * Writes the svg to a file
 * @param filename - the name of the file to write
 * @param path - the path to write to the file
 */
export const writeSvg = (filename: string, path: string, viewBox: Viewbox): void => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" height="${viewBox.height - viewBox.y}px" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" width="${viewBox.width - viewBox.x}px" style="&#10;    fill: black;&#10;    stroke: black;&#10;    stroke-width: 1;&#10;">
  <path d="${path}"/>
</svg>`

  writeFileSync(filename, svg)
}
