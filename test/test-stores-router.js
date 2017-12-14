'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const { Stores } = require('../models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function seedStoreData() {
    console.info('seeding store data');
    const seedData = [];

    for (let i=0; i<=10; i++) {
        seedData.push(generateStoreData());
    }

    return Stores.insertMany(seedData);
}

function generateStoreData() {
    const aisles = [];
    for (let i=0; i<5; i++) {
        aisles.push({
            aisleName: faker.commerce.department(),
            products: [faker.commerce.product(), faker.commerce.product()],
        })
    }
    return {
        name: faker.company.companyName(),
        state: faker.address.state(),
        city: faker.address.city(),
        aisles: aisles
    };
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }

describe('Stores API resource', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      beforeEach(function() {
        return seedStoreData();
      });
    
      afterEach(function() {
        return tearDownDb();
      });
    
      after(function() {
        return closeServer();
      });

      describe('GET endpoint', function() {
          it('should return all stores', function() {
              let res;
              let resStore;
              return chai.request(app)
                .get('/stores')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.length.of.at.least(1);

                    res.body.forEach(function(store) {
                        store.should.be.a('object');
                        store.should.include.keys('id', 'name', 'state', 'city', 'aisles');
                    });

                    resStore = res.body[0];
                    return Stores.findById(resStore.id);
                })
                .then(function(store) {
                    resStore.id.should.equal(store.id);
                    resStore.name.should.equal(store.name);
                    resStore.city.should.equal(store.city);
                });
          });
      });

      describe('POST endpoint', function() {
          it('should add a new store', function() {
              const newStore = generateStoreData();
            
              return chai.request(app)
                .post('/stores')
                .send(newStore)
                .then(function(res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'name', 'state', 'city', 'aisles');
                    res.body.name.should.equal(newStore.name);
                    res.body.id.should.not.be.null;
                    res.body.aisles.should.have.length.of.at.least(1);
                });
          });
      });

      describe('PUT endpoint', function() {
          it('should update fields sent over', function() {
              const updateData = {
                  name: 'Save-A-Little'
              };

              return Stores
                .findOne()
                .then(function(store) {
                    updateData.id = store.id;

                    return chai.request(app)
                        .put(`/stores/${store.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    res.should.have.status(204)

                    return Stores.findById(updateData.id);
                })
                .then(function(store) {
                    store.name.should.equal(updateData.name);
                });
          });
      });

      describe('DELETE endpoint', function() {
        it('delete a store by id', function() {
    
          let store;
    
          return Stores
            .findOne()
            .then(function(_store) {
              store = _store;
              return chai.request(app).delete(`/stores/${store.id}`);
            })
            .then(function(res) {
              res.should.have.status(204);
              return Stores.findById(store.id);
            })
            .then(function(_store) {
              should.not.exist(_store);
            });
        });
      });
  });