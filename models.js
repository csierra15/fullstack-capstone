'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uuid = require('uuid');

const shoppingListSchema = mongoose.Schema ({
    listName: {type: String, required: true},
    content: [{
        name: Name,
        department: Department
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

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = {ShoppingList};