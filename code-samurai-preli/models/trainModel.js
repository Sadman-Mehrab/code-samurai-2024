const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainSchema = new Schema({

    train_id: {
        type: Number,
        required: true
    },
    train_name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    stops: {
        type: [],
        required: true
    },
    

    


},);


module.exports = mongoose.model('Train', trainSchema);