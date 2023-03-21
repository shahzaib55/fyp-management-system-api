 const User = require("../../../models/user/userModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
exports.createuser = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              mobile: req.body.mobile,
              role: req.body.role,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                res.status(501).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
//show admin 
exports.find = (req, res) =>{
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json({
        user: user
      });
    })
    .catch((err) => {
       res.status(400).send(err);
    })
};

//update admin 

exports.update = (req, res) =>{
  if(!req.body){
     return res.status(400).json({
      message: "Data to update cannot be empty"
     })
  }
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.firstname = req.body.firstname,
      user.lastname = req.body.lastname,
      user.email = req.body.email,
      user.mobile = req.body.mobile,
      user.save()
      .then((result)=>{
        res.status(200).json({
          user: user,
          message: "data updated"
          
        });

      })
      .catch((err)=>{
        res.status(500).json({
          user: user,
          message: "cannot update data"
          
        });

      })
      
    })
    .catch((err) => {
       res.status(400).json({
        message: "not found",
        error: err
      });
    })
};


//delete admin
exports.delete = (req, res) =>{
  if(!req.body){
    return res.status(400).json({
     message: "Data to update cannot be empty"
    })
 }
 const id = req.params.id;
 
 User.findByIdAndDelete(id)
 .then((user) => {
  res.status(200).json({
    message: "user deleted"
  });
 })
 .catch((err) => {
    res.status(400).json({
     message: "not found",
     error: err
   });
 })
};