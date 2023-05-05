const Groups = require("../../models/group/groupModel");
const { default: mongoose } = require("mongoose");
const User = require("../../models/user/userModel");
const Supervisor = require("../../models/supervisor/supervisorModel");
const Project = require("../../models/project/projectModel");

function checkuser(userRollNo){
    User.findOne({
    student_roll_no: userRollNo,
    role: "student",
  })
    .then((user) => {
     
      if (user) {
       return user;
       
      } else {
        return false
        
       } 
      
    })
    .catch((user) => {
     
      console.log(false)
      
    })
   

}
// create project
exports.create = async (req, res) => {
  var userRoll1;
  var userRoll2;
  var userRoll3;
  var supervisor_id;
  const userRollNo1 = req.body.group_student1;
  const userRollNo2 = req.body.group_student2;
  const userRollNo3 = req.body.group_student3;

 console.log(checkuser(userRollNo1));

  // if(student1.res.status === 200){
  //   res.status(200).json({
  //     message: "student found",
  //   });

  // }else if(student1.res.status === 404){
  //   res.status(404).json({
  //     message: "student not exist",
  //   });

  // }else{
  //   res.status(500).json({
  //     message: "server erropr",
  //   });

  // }

  //check if rollno1 exits in databae or not
//   await User.findOne({
//     student_roll_no: req.body.group_student1,
//     role: "student",
//   })
//     .then((user) => {
//       if (user) {
//         userRoll1 = user._id;
        
//       } else {
//         res.status(404).json({
//           message: "student not exist",
//           student: req.body.group_student1,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//         msg: "failed",
//       });
//     });
// //check if rollno1 exits in databae or not
// User.findOne({
//   student_roll_no: req.body.group_student2,
//   role: "student",
// })
//   .then((user) => {
//     if (user) {
//       userRoll2 = user._id;
//     } else {
//       res.status(404).json({
//         message: "student not exist",
//         student: req.body.group_student2,
//       });
//     }
//   })
//   .catch((err) => {
//     res.status(501).json({
//       err: err,
//       msg: "failed",
//     });
//   });
//   // //check if rollno1 exits in databae or not
 
//   await User.findOne({
//     student_roll_no: req.body.group_student3,
//     role: "student",
//   })
//     .then((user) => {
//       if (user) {
//         userRoll3 = user._id;
//       } else {
//         res.status(404).json({
//           message: "student not exist",
//           student: req.body.group_student3,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//         msg: "failed",
//       });
//     });

//   // // //check if student already exist in any group
//   // // //check if rollno1 exits in anygroup or not
//   await Groups.findOne({ group_student1: userRoll1 })
//     .then((user) => {
//       if (user) {
//         res.status(403).json({
//           message: "student is member of another group",
//           student: req.body.group_student1,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//       });
//     });
//   await Groups.findOne({ group_student2: userRoll2 })
//     .then((user) => {
//       if (user) {
//         res.status(403).json({
//           message: "student exist",
//           student: req.body.group_student2,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//       });
//     });
//   await Groups.findOne({ group_student3: userRoll3 })
//     .then((user) => {
//       if (user) {
//         res.status(403).json({
//           message: "student exist",
//           student: req.body.group_student3,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//       });
//     });
//     await Supervisor.findOne({ supervisor_name: req.body.group_supervisor })
//     .then((user) => {
//       if (user) {
//         supervisor_id = user._id;
//       } else {
//         res.status(404).json({
//           message: "student not exist",
//           student: req.body.group_student1,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//         msg: "failed",
//       });
//     });
//     await Project.findOne({ Project_name: req.body.group_project_name })
//     .then((user) => {
//       if (user) {
//         project_id = user._id;
//       } else {
//         res.status(404).json({
//           message: "project not exist",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(501).json({
//         err: err,
//         msg: "failed",
//       });
//     });
//     const group_lead = req.body.group_leader;
//     if(group_lead === req.body.group_student1 || group_lead === req.body.group_student2 || group_lead === req.body.group_student3){
//   const group = new Groups({
//     _id: mongoose.Types.ObjectId(),
//     group_name: req.body.group_name,
//     group_section: req.body.group_section,
//     group_supervisor: supervisor_id,
//     group_project: project_id,
//     group_leader: group_lead,
//     group_student1: userRoll1,
//     group_student2: userRoll2,
//     group_student3: userRoll3,
//   });
//   await group
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         result: "group created",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//         msg: "err",
//       });
//     });
//   }else{
//     res.status(403).json({
//       msg: "leader must be inside group",
//     });

//   }
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
