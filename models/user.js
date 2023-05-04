var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    moodtracker:Object, // {notes, emogi, thoughts}
    games:Object, // { chess:{}, arrange: LastScore, quiz: LastScore,  }
    age: Number,
    gender: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

