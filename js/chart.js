import * as chart from './chart.js';

export default chart;

export const printChart = data => {
  return new Promise((resolve, reject) => {
    console.log('print chart');
    console.log(data);

    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 560 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    d3.select('#chart-data > *').remove();

    const svg = d3
      .select('#chart-data')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = createAxisX(svg, data, width, height);
    const y = createAxisY(svg, data, height);

    var u = svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    u.attr('x', d => x(d.bedrooms))
      .attr('y', d => y(d.quantity))
      .attr('width', x.bandwidth())
      .transition()
      .duration(1000)
      .attr('height', d => height - y(d.quantity))
      .attr('fill', '#69b3a2');
  });
};

const createAxisX = (svg, data, width, height) => {
  const x = d3
    .scaleBand()
    .domain(data.map(d => d.bedrooms))
    .range([0, width])
    .padding(0.2);

  const xAxis = svg.append('g').attr('transform', `translate(0, ${height})`);
  xAxis.call(d3.axisBottom(x));
  return x;
};

const createAxisY = (svg, data, height) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.quantity)])
    .range([height, 0]);

  const yAxis = svg.append('g').attr('class', 'myYaxis');
  yAxis.call(d3.axisLeft(y));

  return y;
};
