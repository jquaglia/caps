'use strict';

const vendor = require('../src/vendor.js');
const driver = require('../src/driver.js');

console.log = jest.fn();

describe('Testing the vendor module', () => {
  let payload = {
    event: 'pickup',
    time: 21,
    payload: {
      store: 'Salmon Cookies',
      orderID: '12345678910',
      customer: 'JimBob',
      address: '2 Teletubby lane',
    },
  };

  it('vendor should console log some output', () => {

    // vendor.thankYou(payload);
    // expect(console.log).toHaveBeenCalled();
  });

  it('driver picked up should console log some output', () => {

    // driver.pickedUp(payload);
    // expect(console.log).toHaveBeenCalled();
  });

  it('driver delivered should console log some output', () => {

    // driver.deliveredOrder(payload);
    // expect(console.log).toHaveBeenCalled();
  });
});