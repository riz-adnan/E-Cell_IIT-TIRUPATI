const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require("./user.js");
const Admin = require("./admin.js");
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
        default:"E-CELL"
    },
    date:{
        type: Date,
        default: Date.now
    },
    status :{
        type : String,
        required : true
    },
    users :[{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    owner :{
        type : Schema.Types.ObjectId,
        ref : "Admin"
    },

  });

  module.exports = mongoose.model('Event', EventSchema);