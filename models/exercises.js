const mongoose = require('mongoose');
const { Schema } = mongoose;

const exercises = new Schema({
    userId: {
        type: String,
        required: true
        },
    description:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    date:{
        type: String
    }
    
  });
  const Exer= mongoose.model('Exer', exercises); //use notes not user, to differ it from other models

  module.exports = Exer;