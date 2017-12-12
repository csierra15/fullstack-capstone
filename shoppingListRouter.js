const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {ShoppingList} = require('./models');

router.get('/', (req, res) => {
    ShoppingList
        .find()
        .then(lists => {
            res.json(lists.map(list => list.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'An error occurred'});
        });
});

router.get('/:id', (req, res) => {
    ShoppingList
        .findById(req.params.id)
        .then(list => res.json(list.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'An error occurred'});
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['listName','content'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

ShoppingList
    .create({
        listName: req.body.listName,
        content: req.body.content,
    })
    .then(shoppingList => res.status(201).json(shoppingList.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    });
});

router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
          error: 'Request path id and request body id values must match'
        });
      }
    
      const updated = {};
      const updateableFields = ['listName', 'content'];
      updateableFields.forEach(field => {
        if (field in req.body) {
          updated[field] = req.body[field];
        }
      });
    
      ShoppingList
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedList => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'An error occurred' }));
    
});

router.delete('/:id', (req, res) => {
    ShoppingList
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).json({message: `item \`${req.params.id}\` was deleted`});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'An error occurred'});
        });
});

module.exports = { router };

