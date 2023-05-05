const Company = require("../../models/company/companyModel");
const { default: mongoose } = require("mongoose");

// create project
exports.create = async (req, res) => {
    await Company.findOne({company_name: req.body.company_name})
    .then((user) => {
      if (user) {
        res.status(404).json({
          message: "Company already exist",
        });
      }else{
        const company = new Company({
          _id: mongoose.Types.ObjectId(),
          company_name: req.body.company_name,
          company_contact_person: req.body.company_contact_person,
          company_email: req.body.company_email,
          company_mobile: req.body.company_mobile,
        });
        company
          .save()
          .then((result) => {
            res.status(201).json({
              message: "group created",
            });
          })
          .catch((err) => {
            res.status(501).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(501).json({
        err: err,
      });
    });

};

//show project
exports.findOne = (req, res) => {
    const id = req.params.id;
    Company.find(id)
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
    Company.find()
    .exec()
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
  Company.findById(id)
    .then((data) => {
      data.company_name = req.body.company_name,
      data.company_contact_person = req.body.company_contact_person,
      data.company_email = req.body.company_email,
      data.company_mobile = req.body.company_mobile,
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

  Company.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "company deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "not found",
        error: err,
      });
    });
};
