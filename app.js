const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const morgan = require('morgan');

// //bring in routes
const postRoutes = require("./routes/post");
const { json } = require("body-parser");


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, PUT');
        return res.status(200).json({});
    }
    next();    
})
// //middleware
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRoutes);
app.use(express.json());

module.exports = app;
