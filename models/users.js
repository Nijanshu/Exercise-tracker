const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    }
});

const USER = mongoose.model('userrs', usersSchema); 

module.exports = USER; // Change 'Notes' to 'Users'
