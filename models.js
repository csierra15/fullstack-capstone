'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uuid = require('uuid');

const shoppingListSchema = mongoose.Schema ({
    listName: {type: String, required: true},
    content: [{
        name: {type: String, required: true},
        department: {type: String, required: true}
    }],
    publishedAt: {type: Date, default: Date.now}
});

shoppingListSchema.methods.serialize = function() {
    return {
        id: this._id,
        listName: this.listName,
        content: this.content,
        publishedAt: this.publishedAt
    };
};

const storesSchema = mongoose.Schema ({
    name: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    products: [{
        aisle: {type: String, required: true}
    }]
});

storesSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.name,
        state: this.state,
        city: this.city,
        products: this.products
    };
};

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
const Stores = mongoose.model('Stores', storesSchema);

module.exports = { ShoppingList, Stores };