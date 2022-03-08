const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

//const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;


//Get a handle to dbConnect in connection.js and connect
const dbConnect = require("./src/config/connection");
dbConnect();

//Used for recognizing incoming Request Object as a JSON Object.
//Express middleware
app.use(express.json());

//Handle routes
const stream = require("./src/routes/api/stream");
const post = require("./src/routes/api/post");
const user = require("./src/routes/api/user");

//To serve static files such as images, 
//CSS files, and JavaScript files, 
//use the express.static built-in middleware function in Express.
app.use(express.static('public'));

//Endpoint definition for route
app.use('/api/stream', stream);
app.use('/api/post', post);
app.use('/api/user', user);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname+"/dist/"));
  app.get("*",(req,res) => {
    res.sendFile(__dirname + "/dist/index.html")
  })
}

//Listen on PORT
app.listen(PORT, () => {
  console.log("Servern är startad på port" + PORT);
});