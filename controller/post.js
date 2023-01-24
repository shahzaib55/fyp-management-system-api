const Post = require("../models/post");
const Admin = require("../models/admin");
const { default: mongoose } = require("mongoose");
exports.createuser = (req,res) =>{
    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password

    })

}
exports.getposts = (req, res) => {
    res.json({
        posts: [
            {'name':"haider"},
            {'email':"haider@gmail.com"}
        ]
    })
  };


exports.createPosts = (req, res) => {
   const post = new Post(req.body);
   post.save((err, result) => {
    if(err){
        return res.status(400).json({
            error: err
        });
    }
    res.status(200).json({
        post: result
    });
   })
  };
