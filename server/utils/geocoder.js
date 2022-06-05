import node_geocoder from 'node-geocoder';

const options = {
  provider: "mapquest",
  httpAdapter:"https",
  apiKey: "GgSzDPA2hiwVwS4QIFMNp07oDg51lbqD", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = node_geocoder(options);

// Using callback
//module.exports = geocoder;
export default geocoder;