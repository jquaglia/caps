'use strict';

require('dotenv').config({ path: '../.env' });
const store = process.env.STORE_NAME;
const store2 = process.env.STORE_NAME2;
const faker = require('faker');
const io = require('socket.io-client');
const capsURL = 'http://localhost:3000/caps';
const capsServer = io.connect(capsURL);

function chooseStore() {
  const coinFlip = Math.round(Math.random()) + 1;
  if (coinFlip === 1) {
    return store;
  } else {
    return store2;
  }
}

class Order {
  constructor() {
    this.db = [];
  }

  create() {
    let entry = {
      store: chooseStore(),
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
  console.log(`${payload.payload.store}: Thank you for delivering ${payload.payload.orderID}`);

});

setInterval(() => {
  capsServer.emit('pickup', { event: 'event', time: 'time', payload: orderInterface.create() });
}, 5000);