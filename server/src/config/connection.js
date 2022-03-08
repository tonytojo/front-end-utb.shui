const mongoose = require('mongoose');

//This make it possible to read from .env file
require('dotenv').config();

//Make the connection to MongoDB
async function dbConnect() {
   mongoose.connect('mongodb+srv://Tony:Pissen30060@tonyscluster.qwqe4.mongodb.net/Shuidb?retryWrites=true&w=majority', { useNewUrlParser : true, useUnifiedTopology:true, autoIndex:true },() => {
      console.log('Mongoose successfully connected to database Shuidb');
   });
   //mongoose.connection.on('connected', console.log.bind(console,'Mongoose successfully connected to database'));
};

module.exports = dbConnect;