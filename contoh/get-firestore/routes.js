const { lettucePenyakit1 } = require('./handler');

const routes = [
  {
    path: '/sayur/lettuce/penyakit1',
    method: 'GET',
    handler: lettucePenyakit1
  }
];

module.exports = routes;
