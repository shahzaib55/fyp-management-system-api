const Project = require("../../models/project/projectModel");
const { default: mongoose } = require("mongoose");
const Group = require("../../models/group/groupModel");
const Supervisor = require("../../models/supervisor/supervisorModel");
const bcrypt = require("bcrypt");

// create project
exports.create = (req, res) => {
  var supervisor_id;
  var group_id;
  Project.findOne({ project_name: req.body.project_name })
    .exec()
    .then((data) => {
      if (data) {
        res.status(403).json({
          message: "project already exists",
          data
        });
      } else {
        Group.findOne({ group_name: req.body.group_name })
          .then((user) => {
            if (user) {
              group_id = user._id;
              Supervisor.findOne({ supervisor_name: req.body.supervisor_name })
                .then((user) => {
                  if (user) {
                    supervisor_id = user._id;
                    const data = new Project({
                      _id: mongoose.Types.ObjectId(),
                      project_name: req.body.project_name,
                      project_type: req.body.project_type,
                      project_group: group_id,
                      project_supervisor: supervisor_id,
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
                  } else {
                    res.status(403).json({
                      message: "supervisor not exist",
                    });
                  }
                })
                .catch((err) => {
                  res.status(501).json({
                    err: err,
                    msg: "failed",
                  });
                });
            } else {
              res.status(404).json({
                message: "group not exist",
              });
            }
          })
          .catch((err) => {
            res.status(501).json({
              err: err,
              msg: "failed",
            });
          });
      }
    });
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
