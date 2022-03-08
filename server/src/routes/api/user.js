const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const User = require("../../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const auth = require('./validateToken');

//On test from ARC Header name= Authorization, Header value: Bearer <token>
//@Route POST  http://localhost:5000/api/user/register
//@Description: Register a new user with hashed password and a jwt token
//@Return: On success: status:'success' token, user
//         On error: status:'error', error:err
//@Access Public
router.post("/register", async (req, res) => {
  const { name, email, password, streamNames } = req.body;

  //Some basic validation. Name,email and password must not be empty
  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ status: "error", error: "Credentials can't be empty" });
  }

  //const users = await loadUserCollection();

  //Check if email already exist
  let user = await User.findOne({ email });
  if (user)
  {
    return res.status(400).json({ status: "error", error: "User already exist" });
  }

  const newUser = new User({
    name, email, password, streamNames
  })

  //Generate hashed password
  bcrypt.genSalt(10,(err, salt) => 
  {
    bcrypt.hash(password, salt, (err,hash) => 
    {
       if (err) throw err;
    
       newUser.password = hash;
       newUser.save()
       .then(user => 
       {
          jwt.sign({id: user._id.toString()}, process.env.SecretKey, (err, token) => 
          {
             if(err) throw err;
             res.status(201).json({ token, status:'success', user:{id: user._id.toString(), name:user.name, email:user.email}} )
          });
       })
     });
  })
});

//@Route POST  http://localhost:5000/api/user/login
//@Description: Login a user with email and password.
//@Return: On success: status:'success' token, user
//         On error: status:'error', error:err
//@Access Public
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password)
  {
    return res.status(400).json({ status: "error", error: "Credentials can't be empty" });
  }

  //const users = await loadUserCollection();
  let user = await User.findOne({ email });

  //If empty we have no user
  if (!user)
  {
    return res.status(400).json({status:'error', error: 'User does not exist', user: false });
  }

  //Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword){
    return res.status(400).json({status:'error',  error: 'Invalid password'});
  }

  //Sign jwt token to the returned result
   jwt.sign({id: user._id.toString()}, process.env.SecretKey, (err, token) => {
   if(err) throw err;
    return res.json({ token, status:'success', user:{id: user._id.toString(), streamNames:user.streamNames, name:user.name, email:user.email}} )
  });
 });

//@Route  http://localhost:5000/api/user/delete
//@Description: Delete a user
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
router.delete("/delete",auth, async (req, res) => {
  const { id } = req.body;

  //Get all users
  const users = await loadUserCollection();

  await users
  .deleteOne({ _id: new mongodb.ObjectId(id) })
  .then((result) => {
    return res.status(200).json({status:'success'});
  })
  .catch((err) => {
    res.status(500).json({error: error, error:err});
  });
}); /* end delete */

//@Route  http://localhost:5000/api/user/subscribe
//@Description: Update a user with stream subscription
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
router.put("/subscribe",auth, async (req, res) => {
  const { id, streamNames } = req.body;

  const updateObj = {};
  updateObj.streamNames = streamNames;

  //Get all users
   const users = await loadUserCollection();

   await users
   .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updateObj })
   .then((result) => {
     return res.status(200).json({status:'success'});
   })
   .catch((err) => {
    res.status(500).json({error: error, error:err});
   });
}); /* end delete */






//Get all documents in collection and return them
const loadUserCollection = async () => {
  const client = new MongoClient(
    "mongodb+srv://Tony:Pissen30060@tonyscluster.qwqe4.mongodb.net/Shuidb?retryWrites=true&w=majority"
  );
  await client.connect();
  return client.db(process.env.Database).collection("users");
};

module.exports = router;