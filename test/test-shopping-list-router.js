
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const {ShoppingList} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {DATABASE_URL} = require('../config');

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
    for (let i=0; 1<5; i++) {
        content.push({
            name: faker.name.title(),
            department: faker.commerce.department
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
        return runServer(DATABASE_URL);
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
                .get('/shopping-lists')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.lists.should.be.a('array');
                    res.body.lists.should.have.length.of.at.least(1);

                    res.body.lists.forEach(function(list) {
                        list.should.be.a('object');
                        list.should.include.keys('id', 'listName', 'content', 'publishedAt');
                    });
                    resList = res.body.lists[0];
                    return List.findById(resList.id);
                })
                .then(function(list) {
                    resList.id.should.equal(list.id);
                    resList.name.should.equal(list.name);
                    resList.content.should.equal(list.content);
                });
          };
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
                    res.body.name.should.equal(newList.name);
                    res.body.id.should.not.be.null;
                    res.body.content.should.equal(newList.content);
                });
          });
      });

      describe('PUT endpoint', function() {
          it('should update fields sent over', function() {
              const updateData = {
                  name: 'My List 4'
              };

              return List
                .findOne()
                .then(function(list) {
                    updateData.id = list.id;

                    return chai.request(app)
                        .put(`/shopping-lists.${list.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    res.should.have.status(204)

                    return List.findById(updateData.id);
                })
                .then(function(list) {
                    list.name.should.equal(updateData.name);
                });
          });
      });

      describe('DELETE endpoint', function() {
        it('delete a list by id', function() {
    
          let list;
    
          return List
            .findOne()
            .then(function(_list) {
              list = _list;
              return chai.request(app).delete(`/shopping-lists/${list.id}`);
            })
            .then(function(res) {
              res.should.have.status(204);
              return List.findById(list.id);
            })
            .then(function(_list) {
              should.not.exist(_list);
            });
        });
      });
  });