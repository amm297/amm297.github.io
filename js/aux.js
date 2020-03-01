import Accommodation from './domain/accommodation.js';
import { parseWithDelimiter, groupBy, hasValue } from './processor.js';

import * as aux from './aux.js';

export default aux;

const defaultFileName = '/resources/airbnb-listings.csv';

export const loadAccommodations = fileName => {
  return new Promise((resolve, reject) => {
    parseWithDelimiter(
      hasValue(fileName) ? fileName : defaultFileName,
      Accommodation
    ).then(data => {
      const grouped = groupBy(data, 'neighbourhoodCleansed');
      console.log(grouped);
      resolve(grouped);
    });
  });
};
