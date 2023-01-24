const express = require('express');
const postController = require('../controller/post');
const userController = require('../controller/admin');

const router = express.Router();
router.get('/',postController.getposts);
router.post('/post',postController.createPosts);
router.post('/login',userController.createuser);

module.exports =  router;

