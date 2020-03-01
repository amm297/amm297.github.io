import Accommodation from './accommodation.js';
import Property from './property.js';
import { parseWithDelimiter, groupBy, toNumber } from './processor.js';
import { color, changeOpacity } from './config.js';

const provider =
  'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const boundries = 'resources/madrid.geojson';

const center = [40.416775, -3.70379];

const map = L.map('map').setView(center, 12);
const mapDom = document.getElementById('map');
L.tileLayer(provider, { attribution }).addTo(map);
L.svg({ clickable: true }).addTo(map);

const projectPoint = function(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
};

// load layer madrid boundries
d3.json(boundries).then(data => {
  // L.svg({ clickable: true }).addTo(map);

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

  neighbourhood.on('click', d => updateChartTitle(d.properties.nombre));
  neighbourhood.on('mouseover', (d, i, nodes) => changeOpacity(nodes[i], true));
  neighbourhood.on('mouseout', (d, i, nodes) => changeOpacity(nodes[i], false));

  neighbourhood
    .attr('d', pathCreator)
    .attr('class', 'neighborhood')
    .attr('fill', (d, i) => color(Math.ceil(d.properties.price) % 5));

  const onZoom = () => neighbourhood.attr('d', pathCreator);
  const onMove = () => neighbourhood.attr('d', pathCreator);
  // initialize positioning
  onZoom();
  map.on('zoomend', onZoom);
  map.on('moveend', onMove);
});

const updateChartTitle = tile =>
  (document.getElementById('chart-title').innerText = tile);

// parseWithDelimiter('/resources/airbnb-listings.csv', Accommodation).then(
//   data => {
//     const grouped = groupBy(data, 'neighbourhoodCleansed');
//     console.log(grouped);
//     Object.keys(grouped)
//       .map(neighborhood => {
//         // console.log(grouped[neighborhood]);
//         const accommodations = grouped[neighborhood];
//         const price =
//           accommodations
//             .map(
//               acmdtn =>
//                 toNumber(acmdtn.price) +
//                 toNumber(acmdtn.securityDeposit) +
//                 toNumber(acmdtn.cleaningFee)
//             )
//             .reduce((a, b) => a + b, 0) / accommodations.length;
//         console.log(`Precio [${neighborhood}]: ${price}`);
//       });
//   }
// );
