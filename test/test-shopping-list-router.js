'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const { ShoppingList } = require('../models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function seedListData() {
    console.info('seeding list data');
    const seedData = [];

    for (let i=0; i<=10; i++) {
        seedData.push(generateListData());
    }

    return ShoppingList.insertMany(seedData);
}

function generateListData() {
    const content = [];
    for (let i=0; i<5; i++) {
        content.push({
            name: faker.name.title(),
            department: faker.commerce.department()
        })
    }
    return {
        listName: faker.name.title(),
        content: content
    };
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }

describe('Shopping List API resource', function() {
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
          it('should return all shopping lists', function() {
              let res;
              let resList;
              return chai.request(app)
                .get('/shopping-lists')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.length.of.at.least(1);

                    res.body.forEach(function(list) {
                        list.should.be.a('object');
                        list.should.include.keys('id', 'listName', 'content', 'publishedAt');
                    });

                    resList = res.body[0];
                    return ShoppingList.findById(resList.id);
                })
                .then(function(list) {
                    resList.id.should.equal(list.id);
                    resList.listName.should.equal(list.listName);
                    //resList.content.should.equal(list.content);
                });
          });
      });

      describe('POST endpoint', function() {
          it('should add a new list', function() {
              const newList = generateListData();
              
              return chai.request(app)
                .post('/shopping-lists')
                .send(newList)
                .then(function(res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'listName', 'content', 'publishedAt');
                    res.body.listName.should.equal(newList.listName);
                    res.body.id.should.not.be.null;
                    res.body.content.should.have.length.of.at.least(1);
                    //res.body.content.should.equal(newList.content);
                });
          });
      });

      describe('PUT endpoint', function() {
          it('should update fields sent over', function() {
              const updateData = {
                  listName: 'My List 4'
              };

              return ShoppingList
                .findOne()
                .then(function(list) {
                    updateData.id = list.id;

                    return chai.request(app)
                        .put(`/shopping-lists/${list.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    res.should.have.status(204)

                    return ShoppingList.findById(updateData.id);
                })
                .then(function(list) {
                    list.listName.should.equal(updateData.listName);
                });
          });
      });

      describe('DELETE endpoint', function() {
        it('delete a list by id', function() {
    
          let list;
    
          return ShoppingList
            .findOne()
            .then(function(_list) {
              list = _list;
              return chai.request(app).delete(`/shopping-lists/${list.id}`);
            })
            .then(function(res) {
              res.should.have.status(204);
              return ShoppingList.findById(list.id);
            })
            .then(function(_list) {
              should.not.exist(_list);
            });
        });
      });
  });