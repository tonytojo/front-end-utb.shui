const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const Post = require("../../models/post");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require('./validateToken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('TonysSecretkey');


//@Route  http://localhost:5000/api/item/all
//@Description: Get the whole coffee menu
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
 router.get("/getall", auth, async (req, res) => {

  //Get all posts
    const posts = await loadPostCollection();
     let allPosts = await posts.find({}).toArray();

     allPosts.forEach(element => {
       element.post = cryptr.decrypt(element.post);
     });
   
     return res.status(200).json({status:'success', result:allPosts});
 });


//Create a new post with associated
router.post("/create",auth, async (req, res) => {
  const {userName, post, suitableTagsForPost } = req.body;

  if (!userName || !post) {
    return res.status(400).json({ status: "error", error: "Some property is empty" });
  }

  const newPost = new Post({
    userName, post, suitableTagsForPost
  })

  //Kryptera själva message
  newPost.post = cryptr.encrypt(newPost.post);

  //Save the new stream to db
  newPost.save()
     .then(user => 
      {
        res.status(201).json({status:'success'} )
     })
     .catch(err => {
        res.status(500).json({status:'error', error: err });
     });
});


//Get all documents in collection and return them
const loadPostCollection = async () => {
  const client = new MongoClient(
    "mongodb+srv://Tony:Pissen30060@tonyscluster.qwqe4.mongodb.net/Shuidb?retryWrites=true"
  );
  await client.connect();
  return client.db(process.env.Database).collection("posts");
};

module.exports = router;
