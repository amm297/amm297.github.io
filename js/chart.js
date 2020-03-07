import { hasValue } from './processor.js';
import * as chart from './chart.js';

export default chart;

export const printChart = data => {
  return new Promise((resolve, reject) => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
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

    if (!hasValue(data) || data.length <= 0) {
      const text = svg.append('text').attr('class', 'text-center');
      text
        .text('Este barrio no dispone de datos. Prueba con otro :)')
        .attr('x', '50%')
        .attr('y', '50%');
      resolve(true);
    }

    const x = createAxisX(svg, data, width, height);
    const y = createAxisY(svg, data, height);

    var rect = svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    rect
      .attr('x', d => x(d.bedrooms))
      .attr('y', d => y(0))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(0))
      .attr('class', 'chart-bar');

    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', d => y(d.quantity))
      .attr('height', d => height - y(d.quantity))
      .delay((d, i) => i * 100);
  });
};

const createAxisX = (svg, data, width, height) => {
  const x = d3
    .scaleBand()
    .domain(data.map(d => d.bedrooms))
    .range([0, width])
    .padding(0.2);

  const xAxis = svg.append('g').attr('transform', `translate(0, ${height})`);

  const text = xAxis.append('text').attr('class', 'axis-text');
  text.text('Nº habitaciones').attr('transform', `translate(${width / 2}, 30)`);

  xAxis.call(d3.axisBottom(x));
  return x;
};

const createAxisY = (svg, data, height) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.quantity)])
    .range([height, 0]);

  const yAxis = svg.append('g').attr('class', 'myYaxis');

  const text = yAxis.append('text').attr('class', 'axis-text');
  text
    .text('Nº apartamentos')
    .attr(
      'transform',
      `translate(0, ${height / 2}) rotate(-90) translate(30, -30)`
    );

  yAxis.call(d3.axisLeft(y));
  return y;
};
