'use strict';

const Events = require('events');

const eventEmitter = new Events();

module.exports = eventEmitter;
// const Events = require('events');
// const eventEmitter = new Events();


// eventEmitter.on('pickup', payload => {
//   console.log('picked up ', payload.orderID);
//   eventEmitter.emit('in-transit' );
// });

// eventEmitter.on('in-transit', payload => {
//   console.log();
//   eventEmitter.emit('delivered');
// });

// eventEmitter.on('delivered', payload => {
//   console.log();

// });


// module.exports = eventEmitter;
