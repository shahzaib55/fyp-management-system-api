const Assignment = require("../../models/assignments/assignmentModel");
const { default: mongoose } = require("mongoose");

// create project
exports.create = (req, res) => {
  const assignment = new Assignment({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    due_date: req.body.due_date,
    description: req.body.description,
  });
  assignment
    .save()
    .then((result) => {
      res.status(201).json({
        message: "assignment created",
      });
    })
    .catch((err) => {
      res.status(501).json({
        error: err,
      });
    });
};

//show project
exports.findOne = (req, res) => {
    const id = req.params.id;
  Assignment.find(id)
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
  Assignment.find()
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
  Assignment.findById(id)
    .then((data) => {
        data.title = req.body.title,
        data.due_date = req.body.due_date,
        data.description = req.body.description,
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
  const id = req.params.id;

  Assignment.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "assignment deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "not found",
        error: err,
      });
    });
};
