const provider =
  'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const width = 800;
const height = 400;
const center = [40.416775, -3.70379];

const map = L.map('map').setView(center, 7);
L.tileLayer(provider, { attribution }).addTo(map);

const airbnbFile =
  'https://storage.googleapis.com/keepcoding-bootcamp/input/airbnb-listings.csv';
d3.dsv(';', airbnbFile, data => console.log(data));
