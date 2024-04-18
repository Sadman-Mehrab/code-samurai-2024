const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({

    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
}, );


module.exports = mongoose.model('Book', bookSchema);