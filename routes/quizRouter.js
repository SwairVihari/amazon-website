const express = require('express');
const quizRouter  = express.Router();
const quizModel  = require('./../models/quizModel.js');
const quizThumnailModel = require('./../models/quizThumnailModel.js')

quizRouter.get('/' ,async  (req,res) =>{
   
const quizzes = await quizModel.find({});
 res.send(quizzes);
});

quizRouter.get('/thumnails' ,async(req,res)=>{
  const thumnails =  await quizThumnailModel.find({}).populate('quizPost')
  console.log('thumnails')
  console.log(thumnails)
  res.send(thumnails)

})

module.exports = quizRouter;