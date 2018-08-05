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

var arc = d3
  .arc()
  .innerRadius(width / 6.5 - 60)
  .outerRadius(width / 6.5 - 5)
  .startAngle(0)
  .endAngle(function(d) {
    return (d.value / d.size) * 2 * Math.PI
  })

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

var field = svg
  .selectAll('.field')
  .data(fields)
  .enter()
  .append('g')
  .attr('transform', function(d, i) {
    console.log(`in transform, d: ${d}, ${i}`)
    return 'translate(' + width / 2 + ',' + height / 2 + ')'
  })
  .attr('class', 'field')

field
  .append('path')
  .attr('class', 'path path--background')
  .attr('d', arc)

var path = field.append('path').attr('class', 'path path--foreground')

var label = field
  .append('text')
  .attr('class', 'label')
  .attr('dy', '.35em')
;(function update() {
  var now = new Date()

  field.each(function(d) {
    ;(d.previous = d.value), (d.value = d.update(now))
  })

  path
    .transition()
    .ease(d3.easeLinear)
    .duration(750)
    .attrTween('d', arcTween)

  label.text(function(d) {
    return d.value + d.label
  })

  setTimeout(update, 1000 - (now % 1000))
})()

function arcTween(b) {
  var i = d3.interpolate({ value: b.previous }, b)
  return function(t) {
    return arc(i(t))
  }
}
