const mongoose = require('mongoose');

const ClicksModel = mongoose.Schema({
   tokens:{
       type: Object,
       required : true,
   },
   geoCode :{
       type : String,
       required : true
   },
   ip:{
       type: String ,
       required : true
   },
   isBot:{
       type : Boolean,
       required : true
   },
   device:{
       type: String,
       required :true
   },
   userAgent:{
       type : String,
       required : true
   },
   
   isValidClick :{
     type : Boolean,
     required :true
   },
   clickMessage :{
     type : String,
     required : true
   },
   urlReferrer:{
    type : String,
    required : true
   },  
   tracked:{
    type : Boolean,
    required : true
   },
   campaign : {type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'}
},{ timestamps: true });



module.exports = mongoose.model('Click',ClicksModel);