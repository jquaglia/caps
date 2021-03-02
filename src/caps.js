'use strict';

// Dependencies
const events = require('../events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');
const fecha = require('fecha');
// require('./driver.js');
// require('./vendor.js');

const orderInterface = new vendor.Vendor();


events.on('pickup', driver.pickedUp);
events.on('in-transit', driver.deliveredOrder);
events.on('delivered', vendor.thankYou);

// events.on('pickup', handleEvent); // handleEvent
// events.on('in-transit', handleEvent); // handleEvent
// events.on('delivered', handleEvent); // handleEvent

// function handleEvent(payload) {
//   console.log(`EVENT ${JSON.stringify(payload)}`);
// }

setInterval(() => {
  events.emit('pickup', { event: 'pickup', time: `${fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`, payload: orderInterface.create() });
}, 5000);
