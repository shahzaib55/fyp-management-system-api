const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000

//connect db
const uri = "mongodb://localhost:27017";

async function connect(){
  try{
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    console.log("connected to db")

  } catch (error){
    console.error(error);
  }
}
connect();

//bring in routes
const postRoutes = require('./routes/post');
const { json } = require('body-parser');

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/',postRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})