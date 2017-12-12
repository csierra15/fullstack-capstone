
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const {ShoppingList} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedListData() {
    console.info('seeding list data');
    const seedData = [];

    for (let i=0; i<=10; i++) {
        seedListData.push(generateListData());
    }

    return ShoppingList.insertMany(seedData);
}

function generateListData() {
    return {
        name: faker.name.title(),
        content: faker.commerce.productName()
    };
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }

  describe('Shopping List API resource'), function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      beforeEach(function() {
        return seedListData();
      });
    
      afterEach(function() {
        return tearDownDb();
      });
    
      after(function() {
        return closeServer();
      });

      describe('GET endpoint', function() {
          it('should return all shopping lists'), function() {
              let res;
              return chai.request(app)
                .get('/shopping-list')
          }
      })
  }