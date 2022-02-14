// list of campaign objects title , desccription , img , categgory and this model has a model of questions
const mongoose = require('mongoose');

const quizModel  =  mongoose.Schema({
  title:{
      type : String,
      required :true
  },
  description : {
      type : String,
      required : true,
  },
  image :{
      type : String,
      required : true
  },
  questions : {
      type : Array,
      required : true
  }
});

module.exports = mongoose.model('Quiz',quizModel);