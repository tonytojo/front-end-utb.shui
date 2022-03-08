const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userName: { type: String, required : true },
    post: { type: String, required : true },
    suitableTagsForPost: {type:String},
    registerDate:{type:Date, default:Date.now}
});

//This string Item will create a collection called items in db
module.exports = mongoose.model('Post', postSchema);
