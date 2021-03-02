'use strict';

const events = require('../events.js');
const fecha = require('fecha');

function pickedUp(payload) {
  setTimeout(() => {
    payload.event = 'pickup';
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log('EVENT ', payload);
    console.log(`DRIVER: picked up ${payload.payload.orderID}`);
    events.emit('in-transit', payload);
  }, 1000);
}

function deliveredOrder(payload) {
  setTimeout(() => {
    payload.event = 'in-transit';
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log('EVENT ', payload);
    console.log(`DRIVER: delivered ${payload.payload.orderID}`);
    events.emit('delivered', payload);
  }, 2000);
}

module.exports = {
  pickedUp,
  deliveredOrder,
};

