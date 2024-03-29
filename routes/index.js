const express = require('express');
const userController = require('../controller/user/Login/user');
const adminController = require('../controller/user/admin/admin');
const supervisorController = require('../controller/user/supervisor/supervisor');
const studentController = require('../controller/user/student/student');
const projectController = require('../controller/projects/projects');
const assignmentController = require('../controller/assignments/assignments');
const announcementController = require('../controller/announcements/announcements');
const groupController = require('../controller/groups/groups');
const comapnyController = require('../controller/companies/company');
const router = express.Router();

// user
//sign in user
router.get('/login',userController.checkuser);
router.post('/login/verify',userController.verifyOtp);
//admin
router.post('/admin/signup',adminController.createuser);
router.get('/admin/show/:id',adminController.find);
router.put('/admin/update/:id',adminController.update);
router.delete('/admin/delete/:id',adminController.delete);

//supervisor routes
router.post('/supervisor/create',supervisorController.createuser);
router.get('/supervisor/show/:id',supervisorController.findOne);
router.get('/supervisor/show',supervisorController.findAll);
router.put('/supervisor/update/:id',supervisorController.update);
router.delete('/supervisor/delete/:id',supervisorController.delete);

//student routes
router.post('/student/create',studentController.createuser);
router.get('/student/show/:id',studentController.findOne );
router.get('/student/show',studentController.findAll);
router.put('/student/update/:id',studentController.update);
router.delete('/student/delete/:id',studentController.delete);


//project routes
router.post('/projects/create',projectController.create);
router.get('/projects/show/:id',projectController.findOne);
router.get('/projects/show',projectController.findAll);
router.put('/projects/update/:id',projectController.update);
router.delete('/projects/delete/:id',projectController.delete);

//assignment routes
router.post('/assignment/create',assignmentController.create);
router.get('/assignment/show/:id',assignmentController.findOne);
router.get('/assignment/show',assignmentController.findAll);
router.put('/assignment/update/:id',assignmentController.update);
router.delete('/assignment/delete/:id',assignmentController.delete);


//Announcement routes
router.post('/announcement/create',announcementController.create);
router.get('/announcement/show/:id',announcementController.findOne);
router.get('/announcement/show',announcementController.findAll);
router.put('/announcement/update/:id',announcementController.update);
router.delete('/announcement/delete/:id',announcementController.delete);


//Group routes
router.post('/groups/create',groupController.create);
router.get('/groups/show/:id',groupController.findOne);
router.get('/groups/show',groupController.findAll);
router.put('/groups/update/:id',groupController.update);
router.delete('/groups/delete/:id',groupController.delete);



//Company routes
router.post('/Company/create',comapnyController.create);
router.get('/Company/show/:id',comapnyController.findOne);
router.get('/Company/show',comapnyController.findAll);
router.put('/Company/update/:id',comapnyController.update);
router.delete('/Company/delete/:id',comapnyController.delete);
module.exports =  router;

