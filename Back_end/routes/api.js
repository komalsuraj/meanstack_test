const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {MongoClient} = require("mongodb");

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

async function GetConnection()
{
    console.log("database connected");
    let result = await client.connect();
    let db = result.db("book_store");
    return db.collection("books");
}

async function ReadData(req, res)
{
  let data = await GetConnection();
  data = await data.find().toArray();
  return data;
}

async function DeleteData(req, res)
{
  let data = await GetConnection();
  data = await data.find().toArray();
  return data;
}


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/books', verifyToken, (req, res) => {
  res.send("hi");
  
});

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "komal@gmail.com") && (userData.password == "komal")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = router;