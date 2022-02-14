const express = require('express');
const blogPostRouter = express.Router();
require('./../models/blogPostModel.js');
const blogThumModel = require('./../models/blogThumModel.js')

 
blogPostRouter.use('/:postId' , async (req,res) =>{
const postId = req.params.postId;
const post = await blogThumModel.findById(postId).populate('blogPost');
const recommendedBlogs = await blogThumModel.find({});


res.send({post:post.blogPost,
         recommended : recommendedBlogs ,
        category: post.category});
});


module.exports =  blogPostRouter;