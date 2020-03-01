import * as config from './config.js';

export default config;

const width = 800;
const height = 400;

export const color = d3
  .scaleOrdinal()
  .domain([0, 5])
  .range(['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']);

export const changeOpacity = (path, active) =>
  d3.select(path).classed('neighborhood-actve', active);
