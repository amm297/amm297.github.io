import * as config from './config.js';

export default config;

const width = 800;
const height = 400;

export const numberOfColors = 5;
export const legendWidth = 200;

export const color = d3
  .scaleOrdinal()
  .domain([0, numberOfColors])
  .range(['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']);

export const legendScale = d3
  .scaleLinear()
  .domain([0, numberOfColors])
  .range([0, legendWidth]);

export const changeOpacity = (path, active) =>
  d3.select(path).classed('neighborhood-actve', active);
