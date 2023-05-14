const Groups = require("../../models/group/groupModel");
const { default: mongoose } = require("mongoose");
const User = require("../../models/user/userModel");
const Supervisor = require("../../models/supervisor/supervisorModel");
const Project = require("../../models/project/projectModel");

// function to check if user exists
async function checkuser(userRollNo) {
  try {
    const user = await User.findOne({
      student_roll_no: userRollNo,
      role: "student",
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.log(false);
    return false;
  }
}
// function to check if user exists in any other group
// async function checkuser(userRollNo1,userRollNo2,userRollNo3) {
//   try {
//     const user = await User.findOne({
//       group_student1: userRollNo1 || userRollNo2 || userRollNo3
//     });
//     if (user) {
//       return user;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log(false);
//     return false;
//   }
// }
// create project
exports.create = async (req, res) => {
  try {
    let project_id = null,
      supervisor_id = null,
      user_1id = null,
      user_2id = null,
      user_3id = null,
      leader_id = null;
    const userRollNo1 = req.body.group_student1;
    const userRollNo2 = req.body.group_student2;
    const userRollNo3 = req.body.group_student3;

    const [user1, user2, user3] = await Promise.all([
      checkuser(userRollNo1),
      checkuser(userRollNo2),
      checkuser(userRollNo3),
    ]);
    user_1id = user1._id;
    user_2id = user2._id;
    user_3id = user3._id;
    if (!user1) {
      return res
        .status(404)
        .json({ error: "users not found1", Rollno: req.body.group_student1 });
    } else if (!user2) {
      return res
        .status(404)
        .json({ error: "users not found", Rollno: req.body.group_student2 });
    } else if (!user3) {
      return res
        .status(404)
        .json({ error: "users not found", Rollno: req.body.group_student3 });
    }
    const user_1 = await Groups.findOne({
      group_student1: userRollNo1 || userRollNo2 || userRollNo3,
    }).exec();
    if (user_1) {
      return res.status(403).json({
        msg: "users Already member of another group",
        user: user1.student_roll_no,
      });
    }
    const user_2 = await Groups.findOne({
      group_student2: userRollNo1 || userRollNo2 || userRollNo3,
    }).exec();
    if (user_2) {
      return res.status(403).json({
        msg: "users Already member of another group",
        user: user2.student_roll_no,
      });
    }
    const user_3 = await Groups.findOne({
      group_student3: userRollNo1 || userRollNo2 || userRollNo3,
    }).exec();
    if (user_3) {
      return res.status(403).json({
        msg: "users Already member of another group",
        user: user3.student_roll_no,
      });
    }
    const supervisor = await User.findOne({
      firstname: req.body.group_supervisor,
      role: "supervisor",
    }).exec();
    if (supervisor) {
      supervisor_id = supervisor._id;
    } else {
      return res.status(403).json({
        msg: "supervisor not exist",
        user: req.body.group_supervisor,
      });
    }
    const project = await Project.findOne({
      project_name: req.body.group_project_name,
    }).exec();
    if (project) {
      project_id = project._id;
    } else {
      return res.status(403).json({
        msg: "project not exist",
        user: req.body.group_project_name,
      });
    }
    const group_leader = req.body.group_leader;
    if (group_leader === userRollNo1) {
      leader_id = user_1id;
    } else if (group_leader === userRollNo2) {
      leader_id = user_2id;
    } else if (group_leader === userRollNo3) {
      leader_id = user_3id;
    } else {
      return res.status(403).json({
        message: "leader must be inside group",
      });
    }
    if (
      group_leader === userRollNo1 ||
      group_leader === userRollNo2 ||
      group_leader === userRollNo3
    ) {
      const data = new Groups({
        _id: mongoose.Types.ObjectId(),
        group_name: req.body.group_name,
        group_section: req.body.group_section,
        group_supervisor: supervisor_id,
        group_project: project_id,
        group_leader: userRollNo1,
        group_student1: req.body.group_student1,
        group_student2: req.body.group_student2,
        group_student3: req.body.group_student3,
      });
      data
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
    // .then((user)=>{

    // })
    // .catch(()=>{})
    // if (user) {
    //   return user;
    // } else {
    //   return false;
    // }

    // your code to create project here

    // return res
    //   .status(200)
    //   .json({ message: "Project created successfully", user: user1._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//show project
exports.findOne = (req, res) => {
  const id = req.params.id;
  Groups.find(id)
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
  Groups.find()
    .populate({ path: "group_supervisor", select: ["supervisor_name"] })
    .populate({
      path: "group_project",
      select: ["project_name", "project_type"],
    })
    .populate({ path: "group_student1", select: ["student_roll_no"] })
    .populate({ path: "group_student2", select: ["student_roll_no"] })
    .populate({ path: "group_student3", select: ["student_roll_no"] })

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

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty",
    });
  }
  var userRoll1;
  var userRoll2;
  var userRoll3;

  //check if rollno1 exits in databae or not
  await User.findOne({
    student_roll_no: req.body.group_student1,
    role: "student",
  })
    .then((user) => {
      if (user) {
        userRoll1 = user._id;
      } else {
        res.status(404).json({
          message: "student not exist",
          student: req.body.group_student1,
        });
      }
    })
    .catch((err) => {
      res.status(501).json({
        err: err,
        msg: "failed",
      });
    });
  //check if rollno1 exits in databae or not
  await User.findOne({
    student_roll_no: req.body.group_student1,
    role: "student",
  })
    .then((user) => {
      if (user) {
        userRoll2 = user._id;
      } else {
        res.status(404).json({
          message: "student not exist",
          student: req.body.group_student1,
        });
      }
    })
    .catch((err) => {
      res.status(501).json({
        err: err,
        msg: "failed",
      });
    });
  //check if rollno1 exits in databae or not
  await User.findOne({
    student_roll_no: req.body.group_student1,
    role: "student",
  })
    .then((user) => {
      if (user) {
        userRoll3 = user._id;
      } else {
        res.status(404).json({
          message: "student not exist",
          student: req.body.group_student1,
        });
      }
    })
    .catch((err) => {
      res.status(501).json({
        err: err,
        msg: "failed",
      });
    });
  //check if student already exist in any group
  //check if rollno1 exits in anygroup or not
  const id = req.params.id;
  Groups.findById(id)
    .then((data) => {
      (data.group_name = req.body.group_name),
        (data.group_section = req.body.group_section),
        (data.group_project_name = req.body.group_project_name),
        (data.group_project_type = req.body.group_project_type),
        (data.group_student1 = userRoll1),
        (data.group_student1 = userRoll2),
        (data.group_student1 = userRoll3),
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

  Groups.findByIdAndDelete(id)
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
