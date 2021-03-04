'use strict';

const fecha = require('fecha');
const socketio = require('socket.io');
const io = socketio(3000);
const caps = io.of('/caps');

const packageQueue = {
  flowershop: {
    pickup: {},
    transit: {},
    delivered: {},
  },
  acme: {
    pickup: {},
    transit: {},
    delivered: {},
  },
};

// const packageQueue = {
//   pickup: {},
//   transit: {},
//   delivered: {},
// };

io.on('connection', socket => {

  console.log('New connection created : ' + socket.id);

});

caps.on('connection', capsSocket => {
  
  console.log(' New caps Connection ', capsSocket.id);

  capsSocket.on('pickup', payload => {
    logger('pickup', payload);
    if (payload.payload.store === '1-206-flowers') {
      packageQueue.flowershop.pickup[payload.payload.orderID] = payload;
    } else {
      packageQueue.acme.pickup[payload.payload.orderID] = payload;
    }
    // packageQueue.pickup[payload.payload.orderID] = payload;
    capsSocket.broadcast.emit('pickup', payload);
  });

  capsSocket.on('in-transit', payload => {
    logger('in-transit', payload);
    if (payload.payload.store === '1-206-flowers') {
      delete packageQueue.flowershop.pickup[payload.payload.orderID];
      packageQueue.flowershop.transit[payload.payload.orderID] = payload;
    } else {
      delete packageQueue.acme.pickup[payload.payload.orderID];
      packageQueue.acme.transit[payload.payload.orderID] = payload;
    }
    // delete packageQueue.pickup[payload.payload.orderID];
    // packageQueue.transit[payload.payload.orderID] = payload; 
    capsSocket.broadcast.emit('in-transit', payload);
  });

  capsSocket.on('delivered', payload => {
    logger('delivered', payload);
    if (payload.payload.store === '1-206-flowers') {
      delete packageQueue.flowershop.transit[payload.payload.orderID];
      packageQueue.flowershop.delivered[payload.payload.orderID] = payload;
    } else {
      delete packageQueue.acme.transit[payload.payload.orderID];
      packageQueue.acme.delivered[payload.payload.orderID] = payload;
    }
    // delete packageQueue.transit[payload.payload.orderID];
    // packageQueue.delivered[payload.payload.orderID] = payload;
    capsSocket.broadcast.emit('delivered', payload);
  });

  capsSocket.on('getAll', () => {
    for (let key in packageQueue.pickup) {
      capsSocket.emit('pickup', packageQueue.flowershop.pickup[key]);
    }
    for (let key in packageQueue.acme.pickup) {
      capsSocket.emit('pickup', packageQueue.acme.pickup[key]);
    }
  });
});

function logger(event, payload){
  let time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  payload.event = event;
  payload.time = time;
  console.log('EVENT', payload);
}