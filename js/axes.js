const margin = { top: 50, right: 50, bottom: 50, left: 50 }
let width = window.innerWidth - margin.left - margin.right
let height = window.innerHeight - margin.top - margin.bottom
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let data = [-12, -6, 0, 6, 12]

let axisScale = d3
  .scaleLinear()
  .domain([-12, 12])
  .range(-150, 150)
let xAxis = d3.axisBottom().scale(axisScale)

// let yscale = d3.scaleLinear().domain([d3.min(data), d3.max(data)])
// yscale = d3.scaleLinear().range([height, 0])
// let yAxis = d3.axisLeft().scale(yscale)

// svg
//   .append('g')
//   .attr('class', 'axis')
//   .call(yAxis)

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + height + ',0)')
  .call(xAxis)
