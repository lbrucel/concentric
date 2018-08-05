var margin = { top: 20, right: 20, bottom: 20, left: 20 }
var width = window.innerWidth - margin.left - margin.right
var height = window.innerHeight - margin.top - margin.bottom

//given minutes or seconds and radius, return X,Y
xyFromBase60 = function(baseTime, radius) {
  let radians = (baseTime * 360) / 60
  radians = (radians * Math.PI) / 180
  radians = radians - Math.PI / 2
  return [Math.cos(radians) * radius, Math.sin(radians) * radius]
}

xyFromBase12 = function(baseTime, radius) {
  let radians = (baseTime * 360) / 12
  radians = (radians * Math.PI) / 180
  radians = radians - Math.PI / 2
  return [Math.cos(radians) * radius, Math.sin(radians) * radius]
}

let svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

let outterRadius = (width < height ? width : height) / 2 - 10

const faceR = outterRadius
const hourR = faceR * 0.75
const minR = faceR * 0.5
const secR = faceR * 0.25

let date = new Date()
let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = date.getSeconds()

let cx = width / 2
let cy = height / 2
let center = [cx, cy]
//clock face is the maximum circle in the viewport, centered
svg
  .append('circle')
  .style('fill', 'lightgray')
  .attr('cx', center[0])
  .attr('cy', center[1])
  .attr('r', faceR)

//hour circle
hours = 12
minutes = 0
seconds = 20
console.log(`clock face r: ${faceR}, cx: ${center[0]}, cy: ${center[1]}`)
let hCenter = xyFromBase12(hours, faceR - hourR)
console.log(`hour ${hours} r: ${hourR}, cx: ${hCenter[0]}, cy: ${hCenter[1]}`)
center[0] += hCenter[0]
center[1] += hCenter[1]
console.log(`hour ${hours} r: ${hourR}, cx: ${center[0]}, cy: ${center[1]}`)

svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'blue')
  .style('stroke-width', 4)
  .attr('cx', center[0])
  .attr('cy', center[1])
  .attr('r', hourR)

//minute circle

let mCenter = xyFromBase60(minutes, hourR - minR)
center[0] += mCenter[0]
center[1] += mCenter[1]
svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'red')
  .style('stroke-width', 2)
  .attr('cx', center[0])
  .attr('cy', center[1])
  .attr('r', minR)

//seconds circle
sCenter = xyFromBase60(seconds, minR - secR)
center[0] += sCenter[0]
center[1] += sCenter[1]
svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'green')
  .style('stroke-width', 1)
  .attr('cx', center[0])
  .attr('cy', center[1])
  .attr('r', secR)

//add the time in text
svg
  .append('text')
  .attr('x', 200)
  .attr('y', 750)
  .attr('font-size', '30px')
  .text(`${hours}:${minutes}:${seconds}`)
