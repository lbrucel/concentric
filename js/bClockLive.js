var margin = { top: 20, right: 20, bottom: 20, left: 20 }
var width = window.innerWidth - margin.left - margin.right
var height = window.innerHeight - margin.top - margin.bottom

var fields = [
  {
    value: 12,
    size: 12,
    label: ':',
    update: function(date) {
      return addZeroBefore(date.getHours() % 12)
    },
  },
  {
    value: 60,
    size: 60,
    label: ':',
    update: function(date) {
      return addZeroBefore(date.getMinutes())
    },
  },
  {
    value: 60,
    size: 60,
    label: '',
    update: function(date) {
      return addZeroBefore(date.getSeconds())
    },
  },
]

//add the time in text
function addZeroBefore(time) {
  return (time < 10 ? '0' : '') + time
}

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
let hours = date.getHours() % 12
let minutes = date.getMinutes()
let seconds = date.getSeconds()

let cx = width / 2
let cy = height / 2
let faceCenter = [cx, cy]
//clock face is the maximum circle in the viewport, centered
svg
  .append('circle')
  .style('fill', 'lightgray')
  .attr('cx', faceCenter[0])
  .attr('cy', faceCenter[1])
  .attr('r', faceR)

//hour circle
let hRadius = faceR - hourR
let hCenter = xyFromBase12(hours, hRadius)
hCenter[0] += faceCenter[0]
hCenter[1] += faceCenter[1]

let cHours = svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'black')
  .style('stroke-width', 10)
  .attr('cx', hCenter[0])
  .attr('cy', hCenter[1])
  .attr('r', hourR)

//minute circle

let mRadius = hourR - minR
let mCenter = xyFromBase60(minutes, mRadius)
mCenter[0] += hCenter[0]
mCenter[1] += hCenter[1]
let cMinutes = svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'black')
  .style('stroke-width', 5)
  .attr('cx', mCenter[0])
  .attr('cy', mCenter[1])
  .attr('r', minR)

//seconds circle
let sRadius = minR - secR
sCenter = xyFromBase60(seconds, sRadius)
sCenter[0] += mCenter[0]
sCenter[1] += mCenter[1]
let cSeconds = svg
  .append('circle')
  .style('fill', 'none')
  .style('stroke', 'black')
  .style('stroke-width', 2)
  .attr('cx', sCenter[0])
  .attr('cy', sCenter[1])
  .attr('r', secR)

// console.log(`initial seconds center is ${sCenter}`)

let field = svg
  .selectAll('.field')
  .data(fields)
  .enter()
  .append('g')
  .attr('transform', function(d, i) {
    return 'translate(' + (i * 60 + 40) + ',' + 0 + ')'
  })
  .attr('class', 'field')

let label = field
  .append('text')
  .attr('x', 20)
  .attr('y', height - 20)
  .attr('font-size', '40px')
  .attr('font-family', 'sans-serif')
  .style('fill', 'white')
  .attr('class', 'label')
;(function updateTime() {
  let now = new Date()

  field.each(function(d) {
    ;(d.previous = d.value), (d.value = d.update(now))
  })

  label.text(function(d) {
    return d.value + d.label
  })
  hours = now.getHours() % 12
  minutes = now.getMinutes()
  seconds = now.getSeconds()

  sCenter = xyFromBase60(seconds, sRadius)
  sCenter[0] += mCenter[0]
  sCenter[1] += mCenter[1]
  cSeconds
    .transition(d3.easeLinear)
    .duration(900)
    .attr('cx', sCenter[0])
    .attr('cy', sCenter[1])

  mCenter = xyFromBase60(minutes, mRadius)
  mCenter[0] += hCenter[0]
  mCenter[1] += hCenter[1]
  cMinutes
    .transition(d3.easeLinear)
    .duration(900)
    .attr('cx', mCenter[0])
    .attr('cy', mCenter[1])

  hCenter = xyFromBase12(hours, hRadius)
  hCenter[0] += faceCenter[0]
  hCenter[1] += faceCenter[1]
  cHours
    .transition(d3.easeLinear)
    .duration(900)
    .attr('cx', hCenter[0])
    .attr('cy', hCenter[1])

  setTimeout(updateTime, 1000 - (now % 1000))
})()
