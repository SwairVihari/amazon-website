const express =  require('express');
const userRouter  = express.Router();
const userModel  =  require('./../models/userModel.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

userRouter.get('/',async (req,res) =>{
  const users = await  userModel.find({});
  res.send(users);
});

userRouter.get('/:userId',async (req,res) =>{
    const id = req.params.userId;
    const user =  await userModel.findById(id);
    res.send(user);
});


userRouter.post('/register' , (req,res) =>{

const { name, email, password } = req.body;


userModel.findOne({email:email})
.then(user=>{
  
  if(user){
    return res.status(422).json({ errors: [{ user: "email already exists" }] });
 }else{

  let passwordHash = '';
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      throw err
    } else {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err
        } else {
          passwordHash = hash;   
          const user = userModel({
            name,
            email,
            password :passwordHash,
            approved : false
           });
           user.save()
          .then(response => {
             
             res.status(200).json({
               success: true,   
               userId: response._id    
             })
            
          })
          .catch(err => {
            res.status(500).json({
               errors: [{ error: err }]
            });
          });
           
        }
      })
    }
  });    
  }
});
 
});

userRouter.post('/login' , async (req,res) =>{
  const {  email, password } = req.body;
  userModel.findOne({email :email})
  .then(user => {
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    }else{

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
         return res.status(400).json({ errors: [{ password:
          "incorrect" }] 
         });
        }else{
          
           const accessToken =   jwt.sign(user.name,process.env.JWT_SECRET);
           // need to save jwt to client and user id in cookie or redux state
           res.send({success: true , accessToken :accessToken , userId :user._id});
        }});
    }}).catch(error =>{
    console.log(error);
  })

});

module.exports = userRouter;