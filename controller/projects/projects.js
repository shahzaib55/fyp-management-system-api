const Project = require("../../models/project/projectModel");
const { default: mongoose } = require("mongoose");
const Group = require("../../models/group/groupModel");
const Supervisor = require("../../models/supervisor/supervisorModel");
const User = require("../../models/user/userModel");
const bcrypt = require("bcrypt");

// create project
exports.create = (req, res) => {
  try{
  let supervisor_id=null,group_id=null;
  Project.findOne({ project_name: req.body.project_name })
    .exec()
    .then((data) => {
      if (data) {
        return res.status(403).json({
          message: "project already exists",
          data
        });
      } else {
        Group.findOne({ group_name: req.body.project_group_name })
          .then((user) => {
            if (user) {
              group_id = user.id;
              
            } else {
            return  res.status(404).json({
                message: "group not exist",
              });
            }
          })
          .catch((err) => {
           return res.status(501).json({
              err: err,
              msg: "internal server error",
            });
          });
      
    User.findOne({ firstname: req.body.project_supervisor_name, role: "supervisor" })
                .then((user) => {
                  if (user) {
                    supervisor_id = user.id;
                    console.log(group_id);
                    console.log(supervisor_id);
                    let data = new Project({
                      _id: mongoose.Types.ObjectId(),
                      project_name: req.body.project_name,
                      project_type: req.body.project_type,
                      project_group: group_id,
                      project_supervisor: supervisor_id
                    });
                    const result = data
                      .save()
                      if(result){
                        return res.status(201).json({
                          result: result,
                          message: "project created",

                        });
                      }else{
                        return res.status(501).json({
                          error: err,
                          message: "internal server error1",
                        });
                      }
                  } else {
                    return res.status(403).json({
                      message: "supervisor not exist",
                    });
                  }
                })
                .catch((err) => {
                  return res.status(501).json({
                    err: err,
                    msg: "internal server error",
                  });
                });
              }
            });
              }catch(err){
                return res.status(501).json({
                  err: err,
                  msg: "internal server error",
                });
              }
};
//show project
exports.findOne = (req, res) => {
  Project.find()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
//show all project
exports.findAll = (req, res) => {
  Project.find()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//update project

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty",
    });
  }
  const id = req.params.id;
  Project.findById(id)
    .then((data) => {
      (data.project_name = req.body.project_name),
        (data.project_type = req.body.project_type),
        data
          .save()
          .then((result) => {
            res.status(200).json({
              data: data,
              message: "data updated",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
              message: "cannot update data",
            });
          });
    })
    .catch((err) => {
      res.status(400).json({
        message: "not found",
        error: err,
      });
    });
};

//delete project
exports.delete = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty",
    });
  }
  const id = req.params.id;

  Project.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({
        message: "user deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "not found",
        error: err,
      });
    });
};
