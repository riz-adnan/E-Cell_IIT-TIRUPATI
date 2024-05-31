const mongoose = require('mongoose');
const { Schema } = mongoose;

const ideaSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    
    phoneNumber:{
        type : Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true
    }
    
  });
  
  const Idea = mongoose.model('Idea', ideaSchema);
  module.exports = Idea;