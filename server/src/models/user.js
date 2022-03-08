//userSchema for item to define requirement for the data
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   name: { type: String, require: true },
   email: {type: String, require:true, unique:true},
   password: {type:String, required:true},
   streamNames: {type:String},
   registerDate:{type:Date, default:Date.now}
});

//This string User will create a collection called users in db
module.exports = mongoose.model('User', userSchema);