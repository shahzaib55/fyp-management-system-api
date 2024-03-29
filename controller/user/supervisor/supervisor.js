const User = require("../../../models/user/userModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

//create new admin
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
            const user = new Supervisor({
              _id: mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              mobile: req.body.mobile,
              sup_groups: req.body.sup_groups,
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
//show student 
exports.findAll= (req, res) =>{

  User.find({ role: req.body.role })
    .then((user) => {
      res.status(200).json({
        user: user
      });
    })
    .catch((err) => {
       res.status(400).send(err);
    })
};
//show student 
exports.findOne = (req, res) =>{
  
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

//update student

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
      user.sup_groups = req.body.sup_groups
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


//delete student
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
