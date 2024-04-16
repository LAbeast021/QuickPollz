var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Post = require('../models/post');

// var multer = require('multer');
// var cloudinary = require('cloudinary').v2;
// var {CloudinaryStorage} = require('multer-storage-cloudinary');

// var storage = new CloudinaryStorage({
//     cloudinary : cloudinary, 
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname );
//       },
//     allowedFormats: ["jpg", "jpeg", "png"],
// });
// var upload = multer({storage});

var postsCtrl = require('../controllers/posts');

router.get('/new' ,function(req,res,next) {
    res.render('newPost' , {
        loggedInUser : req.user 
    })
})
router.post('/upload' , async function(req,res,next) {
    try {
        const { question, options } = req.body;
        const createdBy = req.user._id; // Assuming `req.user` contains the authenticated user's information
    
        // Create a new poll with the question, options, and user reference
        const newPoll = new Post({
          question: question,
          options: options.map(option => ({ optionText: option, votes: 0 })),
          createdBy: createdBy
        });
    
        await newPoll.save(); // Save the poll to the database
        res.redirect(`/users/profile/${req.user.id}`); // Redirect to the polls page or wherever appropriate
      } catch (error) {
        res.status(500).send(error.toString());
      }
})

router.post("/vote/:post._id/:option._id" , async  (req,res,next) => {
  
})


module.exports = router;

// // console.log(req.file);
// req.body.image = req.file.path;
// req.body.userId = req.user._id;
// req.body.displayName = req.user.displayName;
// req.body.avatar = req.user.avatar;
// var newPost = new Post (req.body);

// newPost.save(newPost).then((post) => {
//     res.redirect(`/users/profile/${req.user.id}`);
// });
// console.log(newPost);