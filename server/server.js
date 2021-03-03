'use strict';

const fecha = require('fecha');
const socketio = require('socket.io');
const io = socketio(3000);
const caps = io.of('/caps');

io.on('connection', socket => {

  console.log('New connection created : ' + socket.id);

});

caps.on('connection', capsSocket => {
  
  console.log(' New caps Connection ', capsSocket.id);

  capsSocket.on('pickup', payload => {
    logger('pickup', payload);
    capsSocket.broadcast.emit('pickup', payload);
  });

  capsSocket.on('in-transit', payload => {
    logger('in-transit', payload);
    capsSocket.broadcast.emit('in-transit', payload);
  });

  capsSocket.on('delivered', payload => {
    logger('delivered', payload);
    capsSocket.broadcast.emit('delivered', payload);
  });
});

function logger(event, payload){
  let time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  payload.event = event;
  payload.time = time;
  console.log('EVENT', payload);
}