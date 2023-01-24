const Admin = require("../models/admin");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
exports.createuser = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash,
      });
      admin
        .save()
        .then((result) => {
          res.status(201).json({
            message: "user createds",
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
