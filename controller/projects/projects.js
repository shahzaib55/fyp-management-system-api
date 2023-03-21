const Project = require("../../models/projects/projectModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

// create project
exports.create = (req, res) => {
  Project.find({ rollno: req.body.rollno })
    .exec()
    .then((data) => {
      if (data.length >= 1) {
        res.status(409).json({
          message: "roll no exists",
        });
      } else {
            const data = new Project({
              _id: mongoose.Types.ObjectId(),
              group_name: req.body.group_name,
              rollno: req.body.rollno,
              section: req.body.section,
              mobile: req.body.mobile,
              email: req.body.email,
              project_name: req.body.project_name,
              supervisor: req.body.supervisor,
              company: req.body.company,
              company_contact: req.body.company_contact,
              project_type: req.body.project_type,
            });
            data
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "project created",
                });
              })
              .catch((err) => {
                res.status(501).json({
                  error: err,
                });
              });
      }
    });
};
//show project
exports.findOne = (req, res) =>{
  Project.find()
    .then((data) => {
      res.status(200).json({
        data: data
      });
    })
    .catch((err) => {
       res.status(400).send(err);
    })
};
//show all project
exports.findAll = (req, res) =>{
    Project.find()
      .then((data) => {
        res.status(200).json({
          data: data
        });
      })
      .catch((err) => {
         res.status(400).send(err);
      })
  };

//update project

exports.update = (req, res) =>{
  if(!req.body){
     return res.status(400).json({
      message: "Data to update cannot be empty"
     })
  }
  const id = req.params.id;
  Project.findById(id)
    .then((data) => {
      data.project_name = req.body.project_name,
      data.project_type = req.body.project_type,
       data.save()
      .then((result)=>{
        res.status(200).json({
          data: data,
          message: "data updated"
          
        });

      })
      .catch((err)=>{
        res.status(500).json({
          error: err,
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


//delete project
exports.delete = (req, res) =>{
  if(!req.body){
    return res.status(400).json({
     message: "Data to update cannot be empty"
    })
 }
 const id = req.params.id;
 
 Project.findByIdAndDelete(id)
 .then((data) => {
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