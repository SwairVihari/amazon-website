const mongoose = require('mongoose');


const blogThum = mongoose.Schema({
  title:{
      type : String,
      required : true
  },
  image :{
      type : String,
      required : true
  },
  category:{
    type : String,
    required : true
  },
  blogPost :{type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}
});

module.exports = mongoose.model('BlogThumbnail',blogThum);