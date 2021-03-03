'use strict';

// Dependencies
const events = require('./events.js');
require('./driver.js');
require('./vendor.js');


events.on('pickup', handleEvent); // handleEvent
events.on('in-transit', handleEvent); // handleEvent
events.on('delivered', handleEvent); // handleEvent


function handleEvent(payload) {
  console.log(`EVENT: ${JSON.stringify(payload)}`);
}

