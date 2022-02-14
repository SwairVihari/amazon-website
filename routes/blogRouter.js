const express = require('express');
const blogRouter  = express.Router();
const blogThumModel = require('./../models/blogThumModel.js');

blogRouter.get('/' ,async (req,res) =>{
 const blogs  = await blogThumModel.find({});

 res.send(blogs);
});

module.exports =  blogRouter;