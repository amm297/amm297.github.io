import * as chart from './chart.js';

export default chart;

export const printChart = data => {
  return new Promise((resolve, reject) => {
    console.log('print chart');
    console.log(data);

    const pene = d3.select('#chart-data > *').remove();
    const caca = [
      [5, 20, 20],
      [480, 90, 30],
      [25, 50, 20],
      [100, 33, 20],
      [330, 95, 30]
    ];

    const height = 500;
    const width = 500;
    const axisHeight = 20;
    const radius = d3.max(caca, d => d[2]);

    const extentX = d3.extent(caca, d => d[0]);
    const scaleX = d3
      .scaleLinear()
      .domain(extentX)
      .range([radius + axisHeight, width - radius]);

    const scaleY = d3
      .scaleLinear()
      .domain(d3.extent(caca, d => d[1]))
      .range([height - radius - axisHeight, radius]);

    const svg = d3.select('#chart-data').append('svg');

    svg.attr('width', width).attr('height', height);

    const group = svg
      .selectAll('g')
      .data(caca)
      .enter()
      .append('g');

    group.attr('transform', d => `translate(${scaleX(d[0])}, ${scaleY(d[1])})`);

    const circle = group.append('circle');

    circle
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => d[2]);

    const text = group.append('text');

    text
      .attr('x', d => (d[0] > extentX[1] / 2 ? -d[2] * 3 : d[2]))
      .attr('y', 0)
      .text(d => `[${d[0]},${d[1]}]`);

    const groupAxisX = svg.append('g');

    const xAxis = d3.axisBottom(scaleX);

    groupAxisX
      .attr('transform', `translate(0,${height - axisHeight})`)
      .call(xAxis);

    const groupAxisY = svg.append('g');

    const yAxis = d3.axisRight(scaleY);

    groupAxisY.call(yAxis);
  });
};
