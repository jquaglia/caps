'use strict';

require('dotenv').config({ path: '../.env' });
// const events = require('../events.js');
const store = process.env.STORE_NAME;
const faker = require('faker');
const fecha = require('fecha');

class Vendor {
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

function thankYou(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
  payload.event = 'delivered';
  payload.time = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log('EVENT ', payload);
}

// const orderInterface = new Vendor();

// setInterval(() => {
//   events.emit('pickup', { event: 'pickup', time: `${faker.time.recent}`, payload: orderInterface.create() });
// }, 5000);

// console.log(store);
module.exports = {
  Vendor,
  thankYou,
};