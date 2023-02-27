const Admin = require("../../../models/user/admin/adminModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const admin = require("../../../models/user/admin/adminModel");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const axios = require("axios");
const Otp = require("../../../models/otpModel");
const otpGenerator = require("otp-generator");
require("dotenv/config");
const nodemailer = require("nodemailer");

exports.createuser = (req, res) => {
  Admin.find({ email: req.body.email })
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
exports.checkuser = (req, res) => {
  admin
    .find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          message: "auth failed",
        });
      } else {
        const number = user[0].mobile;
        const email = user[0].email;
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(403).json({
              message: "auth failed",
            });
          } else if (result) {
            const OTP = otpGenerator.generate(4, {
              digits: true,
              lowerCaseAlphabets: false,
              upperCaseAlphabets: false,
              specialChars: false,
            });
            console.log(OTP);
            const otp = new Otp({ email: email, otp: OTP });
            // const salt = bcrypt.genSalt(10);
            // otp.otp = bcrypt.hash(otp.otp, salt);
            const result = otp.save();
            const mailOption = {
              from: "Superior FYP Team",
              to: email,
              subject: "OTP Verification",
              text: `Your OTP Verification code is: ${OTP}`,
              html: `
              <h3>Hi</h3>
              <p>Your OTP Verification code is: <h3>${OTP}</h3></p>
              <p><b>note: </b> OTP is valid for <b>5 minutes</b></p>
              <p>Regards,</p>
              <p>Superior FYP Team</p>`,
            };
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "info.fyp.superior@gmail.com",
                pass: "bghybhpbjnayknyf",
              },
            });

            transporter.sendMail(mailOption, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log("email sent", info.response);
              }
            });
            res.status(200).json({
              message: "auth success",
            });
          } else {
            res.status(401).json({
              message: "auth failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "not found",
        error: err,
      });
    });
};

module.exports.verifyOtp = async (req, res) => {
  await Otp.find({
    email: req.body.email,
  })
    .exec()
    .then((otpHolder) => {
      if (otpHolder.length === 0) {
        return res.status(400).send("you use an expired otp");
      }
      const rightOtpFind = otpHolder[otpHolder.length - 1];
      if (
        rightOtpFind.email === req.body.email &&
        req.body.otp === rightOtpFind.otp
      ) {
        // const user = new Admin(_.pick(req.body, ["number"]));
        // const token = user.save()
        Admin.find({ email: req.body.email })
          .exec()
          .then((user) => {
            if (user.length > 0) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                },
                process.env.JWT_SCRET_KEY,
                {
                  expiresIn: "24h",
                }
              );
              res.status(200).json({
                data: user,
                message: "auth success",
                token: token,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
              message: "not found",
              error: err,
            });
          });
      } else {
        res.status(401).json({
          message: "wrong otp",
        });
      }
    });
};
