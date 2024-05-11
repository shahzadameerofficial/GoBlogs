const express = require('express');
const authController = require('../controllers/authController');
const authHandler = require('../middlewares/authHandler');
const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');


const router = express.Router();

router.get('/', (req, res)=> res.json({msg: 'Welcome to the GoBlogs Api. Enter the corresponding endpoint to get results.'}))


module.exports = router
// user
// register
router.post('/register', authController.register)

// login
router.post('/login', authController.login)

// logout
router.post('/logout', authHandler, authController.logout)

// refresh token
router.get('/refresh', authController.refresh)
// delete user and its blogs
router.delete('/delete-account/:userId', authController.deleteAccount)


//blog
// CRUD

// Create Blog
router.post('/blogs/new', authHandler, blogController.createBlog)

// Get All Blogs
router.get('/blogs', blogController.getAllBlogs)

// Get Blog by Id
router.get('/blogs/:id', blogController.getBlogById)


// Get Blogs by User
router.get('/blogs/users/:id', blogController.getBlogsByUser)

// Update Blog
router.put('/blogs/update', authHandler, blogController.updateBlog)

// Delete Blog
router.delete('/blogs/:id', authHandler, blogController.deleteBlog)

// Search Blogs by Title
router.get('/blogs/search/:title', blogController.getBlogsByTitle)

//comment
// create comment
router.post('/comment', authHandler, commentController.createComment)
// update comment
router.put('/comment/update', authHandler, commentController.updateComment)

// read comments by blog id
router.get('/comment/:id', authHandler, commentController.getBlogComments)
// delete comment
router.delete('/comment/:id', authHandler, commentController.deleteCommentById)

