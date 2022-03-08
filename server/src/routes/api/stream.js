const express = require("express");
const router = express.Router();
const { MongoClient} = require("mongodb");
const mongodb = require("mongodb");
//const { itemValidation } = require("../../validation/validation");
const Stream = require("../../models/stream");
const mongoose = require('mongoose')
require('dotenv').config();
const auth = require('./validateToken');

//@Route  http://localhost:5000/api/stream/create
//@Description: Create a new stream
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
router.post("/create", auth, async (req, res) => {
  const { name, description } = req.body;

  //Validate name
  if (!name)
  {
    return res.status(400).json({ status: "error", error: "Name can't be empty" });
  }

  //const streams = await loadStreamsCollection();

  //Check if this stream already exist
  let stream = await Stream.findOne({ name });
  if (stream)
  {
    return res.status(400).json({ status: "error", error: "Name already exist" });
  } 

  //Create a new stream
  const newStream = new Stream({
    name, description
  })

  //Save the new stream to db
  newStream.save()
     .then(user => 
      {
        //res.status(201).json({ status:'success'} )
        res.status(201).json({status:'success', stream:{id: user._id.toString()}} )
     })
     .catch(err => {
        res.status(500).json({status:'error', error: err });
     });
});

//@Route  http://localhost:5000/api/stream/getall
//@Description: Get all streams
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
router.get("/getall", auth, async (req, res) => {
  //Get all streams
  const streams = await loadStreamsCollection();
   let allStreams = await streams.find({}).toArray()
   return res.status(200).json({status:'success', result:allStreams});
}); /* end getall */


//@Route  http://localhost:5000/api/stream/delete +id
//@Description: Delete a streams
//@Return: On success: status:'success', result:result
//         On error: status:'error', error:err
//@Access Private must be authenticated with JWT
router.delete("/delete",auth, async (req, res) => {
  const { id } = req.body;

  //Get all streams
  const streams = await loadStreamsCollection();

  await streams
  .deleteOne({ _id: new mongodb.ObjectId(id) })
  .then((result) => {
    return res.status(200).json({status:'success'});
  })
  .catch((err) => {
    res.status(500).json({error: error, error:err});
  });
}); /* end delete */


//Get all documents in collection and return them
const loadStreamsCollection = async () => {
  const client = new MongoClient(
    'mongodb+srv://Tony:Pissen30060@tonyscluster.qwqe4.mongodb.net/Shuidb?retryWrites=true'
  );
  await client.connect();
  return client.db(process.env.Database).collection(process.env.Collection);
};

module.exports = router;
