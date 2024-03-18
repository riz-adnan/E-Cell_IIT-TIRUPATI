const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
   
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    urltoimage1:{
        type:String,
        default: "..."
    },
    urltoimage2:{
        type:String,
        default: "..."
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('Blog', BlogSchema);