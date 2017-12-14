const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Stores } = require('./models');

router.get('/', (req, res) => {
    Stores
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
    Stores
        .findById(req.params.id)
        .then(list => res.json(list.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'An error occurred'});
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['name','state', 'city', 'aisles'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

Stores
    .create({
        name: req.body.name,
        state: req.body.state,
        city: req.body.city,
        aisles: req.body.aisles
    })
    .then(stores => res.status(201).json(stores.serialize()))
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
      const updateableFields = ['name', 'aisles'];
      updateableFields.forEach(field => {
        if (field in req.body) {
          updated[field] = req.body[field];
        }
      });
    
      Stores
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedStore => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'An error occurred' }));
    
});

router.delete('/:id', (req, res) => {
    Stores
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