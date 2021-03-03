'use strict';

const fecha = require('fecha');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);


capsServer.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.payload.orderID}`);
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    payload.event = 'in-transit';
    capsServer.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.payload.orderID}`);
    payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    payload.event = 'delivered';
    capsServer.emit('delivered', payload);
  }, 3000);
});