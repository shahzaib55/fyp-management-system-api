const Announcement = require("../../models/announcements/announcementModel");
const { default: mongoose } = require("mongoose");

// create project
exports.create = (req, res) => {
  const announcement = new Announcement({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });
  announcement
    .save()
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "announcement created",
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
    Announcement.find(id)
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
    Announcement.find()
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
  Announcement.findById(id)
    .then((data) => {
        data.title = req.body.title,
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

  Announcement.findByIdAndDelete(id)
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
