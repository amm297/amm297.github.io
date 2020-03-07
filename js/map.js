import { numberOfColors, legendScale, color, changeOpacity } from './config.js';
import { eventEmitter } from './events.js';
import { hasValue } from './processor.js';

import * as mapModule from './map.js';

export default mapModule;

const provider =
  'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const boundries = 'resources/madrid.geojson';

const center = [40.416775, -3.70379];

const map = L.map('map', { zoomControl: false }).setView(center, 12);

L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer(provider, { attribution }).addTo(map);
L.svg({ clickable: true }).addTo(map);

const projectPoint = function(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
};

export const printMap = () => {
  return new Promise((resolve, reject) => {
    // load layer madrid boundries
    d3.json(boundries).then(data => {
      const svg = d3
        .select('#map')
        .select('svg')
        .attr('pointer-events', 'auto');

      const groupMap = svg
        .append('g')
        .attr('id', 'map-group')
        .attr('style', 'pointer-events:visiblePainted;');
      const projection = d3.geoTransform({ point: projectPoint });
      const pathCreator = d3.geoPath().projection(projection);

      const neighbourhood = groupMap
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('style', 'pointer-events:visiblePainted;');

      neighbourhood.on('click', (d, i, nodes) =>
        updateChartTitle(nodes[i], d.properties.nombre)
      );
      neighbourhood.on('mouseover', (d, i, nodes) =>
        changeOpacity(nodes[i], true)
      );
      neighbourhood.on('mouseout', (d, i, nodes) =>
        changeOpacity(nodes[i], false)
      );

      neighbourhood
        .attr('d', pathCreator)
        .attr('class', 'neighborhood')
        .attr('fill', (d, i) => color(d.properties.price));

      const onZoom = () => neighbourhood.attr('d', pathCreator);
      const onMove = () => neighbourhood.attr('d', pathCreator);
      // initialize positioning
      onZoom();
      map.on('zoomend', onZoom);
      map.on('moveend', onMove);

      const margins = d3.extent(data.features, d => d.properties.price);
      printLegend(svg, margins);

      resolve(true);
    });
  });
};

let lastPath = null;
const updateChartTitle = (path, title) => {
  eventEmitter.notify('changeNeighborhood', title);
  if (hasValue(lastPath)) {
    d3.select(lastPath).classed('neighborhood-selected', false);
  }
  d3.select(path).classed('neighborhood-selected', true);
  lastPath = path;
  document.getElementById('chart-title').innerText = title;
};

const printLegend = (svg, margins) => {
  const bounds = document.getElementById('map').getClientRects()[0];
  const width = bounds.width / 2.8;
  const legendHeight = 20;
  const numberOfLegends = 5;

  const step = (margins[1] - margins[0]) / numberOfLegends;
  const texts = [...Array(numberOfLegends).keys()].map(i => `< ${i * step}`);

  const legendContainer = d3
    .select('#legend')
    .append('svg')
    .attr('width', width)
    .attr('height', legendHeight);

  const legend = legendContainer.append('g').attr('class', 'legend');

  const scaleLegend = d3
    .scaleLinear()
    .domain([0, numberOfLegends])
    .range([0, width]);

  color.range().forEach((it, i) => {
    const legendGroup = legend
      .append('g')
      .attr('transform', `translate(${scaleLegend(i)}, 0)`);
    const legendcolor = legendGroup.append('rect');
    const widthRect = width / numberOfLegends - 2;
    legendcolor
      .attr('width', widthRect)
      .attr('height', legendHeight)
      .attr('fill', it)
      .attr('class', 'frame-1');

    const legendtext = legendGroup.append('text').attr('class', 'text-center');
    legendtext
      .text(texts[i])
      .attr('x', widthRect / 2)
      .attr('y', '50%');
  });
};
