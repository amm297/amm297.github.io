export default class ChartAccommodation {
  constructor(bedrooms, quantity) {
    this.bedrooms = bedrooms;
    this.quantity = quantity;
    this.label = `${quantity} ${
      quantity === 1 ? 'apartamento' : 'apartamentos'
    }`;
  }
}
