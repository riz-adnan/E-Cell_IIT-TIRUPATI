const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
   
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
    posterlink:{
        type:String,
        default: "..."
    },
    day:{
        type:String,
        default:"1"
    },
    month:{
        type:String,
        default:"Jan"
    },
    eventtime:{
        type:String,
        default:"05:00"
    },
    coordinator:{
        type:String,
        default:"The Statistics Club"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('Event', EventSchema);