/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Bulldog Inglés',
  height: '40 - 50',
  weight: 'N23 - 25'
};
const temperament = {
  name: 'Friendly'
}

describe('Breed routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(dog)));
  describe('GET /breeds', () => {
    it('should get 200', () =>
      agent.get('/breeds').expect(200)
    );
  });
});

describe('Temperament routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => Temperament.create(temperament)));
  describe('GET /temperaments', () => {
    it('should get 200', () => agent.get('/temperaments').expect(200));
  });
});