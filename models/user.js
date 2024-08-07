const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const passportLocalmongoose = require("passport-local-mongoose");


const user1 = new Schema({
 
        email :{
            type :String ,
        required : true 
        } ,
        username : {
            type : String ,
            required : true
        }

}) ;

user1.plugin(passportLocalmongoose);

  module.exports = mongoose.model("User", user1);
 