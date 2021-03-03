'use strict';

require('dotenv').config({ path: '../.env' });
const store = process.env.STORE_NAME;
const events = require('./events.js');
const faker = require('faker');
const fecha = require('fecha');

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


events.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
  payload.event = 'delivered';
  payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
});

setInterval(() => {
  events.emit('pickup', { event: 'pickup', time: `${fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}`, payload: orderInterface.create() });
}, 5000);
