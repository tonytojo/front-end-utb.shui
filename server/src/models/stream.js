//itemSchema for item to define requirement for the data
const mongoose = require('mongoose');

const streamSchema = mongoose.Schema({
    name: { type: String, required : true },
    description : {type:String},
    registerDate:{type:Date, default:Date.now}
});

//This string Item will create a collection called items in db
module.exports = mongoose.model('Stream', streamSchema);

