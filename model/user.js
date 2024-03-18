const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Event = require("./event.js");
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    // graduationYear :{
    //     type : String,
    //     required : true
    // },
    // phoneNo :{
    //     type : Number,
    //     required : true
    // },
    events : [{
            type : Schema.Types.ObjectId,
            ref : "Event"
    }],
    verified :{
        type : Boolean,
        default : false
    }
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);