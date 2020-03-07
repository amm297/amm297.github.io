import { loadAccommodations } from './aux.js';
import { printMap } from './map.js';
import { eventEmitter } from './events.js';
import { groupBy, hasValue, toNumber } from './processor.js';
import { printChart } from './chart.js';
import ChartAccommodation from './domain/chart-accommodation.js';

loadAccommodations().then(data => {
  const accommodations = data;
  printMap().then(() => {
    const loadingLayer = document.getElementById('loading');
    loadingLayer.classList.add('hide');
  });

  eventEmitter.on('changeNeighborhood', neighborhood => {
    const acmmdtns = groupBy(accommodations[neighborhood], 'bedrooms');
    const data = Object.keys(acmmdtns)
      .filter(it => hasValue(it) && it.length > 0)
      .map(it => new ChartAccommodation(toNumber(it), acmmdtns[it].length));
    printChart(data);
  });
});
