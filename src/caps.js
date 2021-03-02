'use strict';

// Dependencies
const events = require('../events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');
const fecha = require('fecha');
// const faker = require('faker');

const orderInterface = new vendor.Vendor();

// Event that will be published, setting up subscribers for events.
events.on('pickup', driver.pickedUp);
events.on('in-transit', driver.deliveredOrder);
events.on('delivered', vendor.thankYou);

// console.log(faker.time.recent);
// Aritificial interaction point.
setInterval(() => {
  events.emit('pickup', { event: 'pickup', time: `${fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`, payload: orderInterface.create()});
}, 5000);
