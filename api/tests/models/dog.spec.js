const { Breed, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe('Name, height and weight', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if height is null', (done) => {
        Breed.create({ name: 'Bulldog Inglés' })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should throw an error if weight is null', (done) => {
        Breed.create({
          name: 'Bulldog Inglés',
          height: '40 - 50',
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      
      it('It should work when its a valid name, a valid height, and weight', () => {
        Breed.create({
          name: 'Bulldog Inglés',
          height: '40 - 50',
          weight: 'N23 - 25'
        })
      });
    });
  });
});

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('Name', () => {
      it('should throw an error if name is null', (done) => {
        Temperament.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });     
      it('It should work when its a valid name', () => {
        Temperament.create({
          name: 'Friendly',
        })
      });
    });
  });
});
