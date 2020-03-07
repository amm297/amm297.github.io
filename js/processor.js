import * as processor from './processor.js';

export default processor;

export const parseWithDelimiter = (fileName, returnClass) => {
  return new Promise((resolve, reject) => {
    d3.text(fileName).then(data => {
      const aux = data.split('\n').map(it => {
        const attrs = it.split(';');
        return new returnClass(attrs); //{ city: attrs[0], population: attrs[1], aux: attrs[2] };
      });
      resolve(aux);
    });
  });
};

export const groupBy = (items, key) => {
  if (!hasValue(items)) {
    return [];
  }

  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  );
};

export const toNumber = val => {
  if (!hasValue(val)) {
    return 0;
  }
  try {
    return Number(val);
  } catch (err) {
    return 0;
  }
};

export const hasValue = item => {
  return item !== undefined && item !== null;
};
