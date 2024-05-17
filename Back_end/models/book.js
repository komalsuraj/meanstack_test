const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    publish_date: Date
});

module.exports = mongoose.model('book', bookSchema, 'books');