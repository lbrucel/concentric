var margin = { top: 50, right: 50, bottom: 50, left: 50 }
var width = window.innerWidth - margin.left - margin.right
var height = window.innerHeight - margin.top - margin.bottom

var fields = [
  {
    value: 24,
    size: 24,
    label: 'h',
    update: function(date) {
      return date.getHours()
    },
  },
  {
    value: 60,
    size: 60,
    label: 'm',
    update: function(date) {
      return date.getMinutes()
    },
  },
  {
    value: 60,
    size: 60,
    label: 's',
    update: function(date) {
      return date.getSeconds()
    },
  },
]

var y = d3.scale
  .ordinal()
  .domain(d3.range(1))
  .rangePoints([0, height])

let outterRadius = (width < height ? width : height) / 2
console.log(`width: ${width}, height: ${height}, outterRadius: ${outterRadius}`)

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

svg
  .selectAll('circle')
  .data(y.domain())
  .enter()
  .append('circle')
  .attr('stroke-width', 1)
  .attr('r', 10)
  .attr('cx', width / 2)
  .attr('cy', y)
  .each(pulse)

function pulse() {
  var circle = svg.select('circle')
  ;(function repeat() {
    var now = new Date()

    circle = circle
      .transition()
      .duration(1000)
      .attr('stroke-width', 1)
      .attr('r', 10)
      .transition()
      .duration(750)
      .attr('stroke-width', 1)
      .attr('r', outterRadius)
      .ease('linear')
    // .each('end', repeat)

    setTimeout(repeat, 1000 - (now % 1000))

    label.text(function(d) {
      return d.value + d.label
    })

    field.each(function(d) {
      ;(d.previous = d.value), (d.value = d.update(now))
    })
  })()
}
