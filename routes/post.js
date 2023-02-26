const express = require('express');
const userController = require('../controller/user/admin/admin');
const router = express.Router();


router.post('/admin/signup',userController.createuser);
router.post('/login',userController.checkuser);
router.post('/login/verify',userController.verifyOtp);

module.exports =  router;

