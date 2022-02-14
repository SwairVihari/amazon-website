
const mongoose = require('mongoose');

const blogPostModel = mongoose.Schema({
  image:{
    type : String,
    required : true,
  },
  fullTitle :{
      type : String,
      required : true,
  },
  body :{
      type : Array,
      required : true
  }
});

module.exports = mongoose.model('BlogPost',blogPostModel);