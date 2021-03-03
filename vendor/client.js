'use strict';

require('dotenv').config({ path: '../.env' });
const store = process.env.STORE_NAME;
const faker = require('faker');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);


class Order {
  constructor() {
    this.db = [];
  }
  
  create() {
    let entry = {
      store: store,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };
    this.db.push(entry);
    return entry;
  }
}
const orderInterface = new Order();

capsServer.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
});

setInterval(() => {
  capsServer.emit('pickup', { event: 'event', time: 'time', payload: orderInterface.create() });
}, 5000);