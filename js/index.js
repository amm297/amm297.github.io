import { loadAccommodations } from './aux.js';
import { printMap } from './map.js';
import { eventEmitter } from './events.js';

loadAccommodations().then(data => {
  const accommodations = data;
  printMap();

  eventEmitter.on('changeNeighborhood', neighborhood =>
    console.log(accommodations[neighborhood])
  );
});
