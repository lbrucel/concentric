var margin = { top: 50, right: 50, bottom: 50, left: 50 }
var width = window.innerWidth - margin.left - margin.right
var height = window.innerHeight - margin.top - margin.bottom
var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//define the function being graphed
var fn = function(x, h, m, s) {
  let y = h * Math.pow(x, 2)
  y += m * x
  y += s
  return y
}

//set the range of the x axis
var x = d3
  .scaleLinear()
  .domain([-12, 12])
  .range([0, width])

//set the range of the y axis
var y = d3
  .scaleLinear()
  .domain([-200, 200])
  .range([height, 0])

var xAxis = d3.axisBottom().scale(x)

var yAxis = d3.axisLeft().scale(y)

var line = d3
  .line()
  .curve(d3.curveBasis)
  .x(function(d) {
    return x(d.x)
  })
  .y(function(d) {
    return y(d.y)
  })

var data = d3.range(-12, 12).map(function(x) {
  return { x: x, y: fn(x, -12, 59, 59) }
})

// x.domain(
//   d3.extent(data, function(d) {
//     return d.x
//   })
// )
// y.domain([
//   d3.min(data, function(d) {
//     return d.y
//   }),
//   d3.max(data, function(d) {
//     return d.y
//   }),
// ])

let yTranslate = width / 2
console.log(`yTranslate is ${yTranslate}`)

var xTranslate = height / 2
console.log(`xTranslate is ${xTranslate}`)

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(0,${xTranslate})`)
  .call(xAxis)

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(${yTranslate},0)`)
  .call(yAxis)

console.log('data is: ', data)
svg
  .append('path')
  .datum(data)
  .attr('d', line)
