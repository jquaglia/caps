'use strict';

const events = require('./events.js');
const fecha = require('fecha');

events.on('pickup', payload => {
  setTimeout(() => {
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log(`DRIVER: picked up ${payload.payload.orderID}`);
    payload.event = 'in-transit';
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log(`DRIVER: delivered ${payload.payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
});
