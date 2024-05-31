const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSuccessfulSchema = new Schema({
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
  const IdeaSuccessfull = mongoose.model('IdeaSuccessfull', IdeaSuccessfulSchema);
  module.exports = IdeaSuccessfull;
  