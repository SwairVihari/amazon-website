const mongoose = require('mongoose');


const campaignModel = mongoose.Schema({
   campaignName :{
       type: String,
       required : true
   },
   devices :{
      type: [String],
      required : true
   },
   geos:{
       type: [String],
       required : true
   },
   isActive :{
    type: Boolean,
    required: true,
    default: false
   },
   offerLink :{
       type : String 
   },
   source:{
    type : String 
   },
   brokers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Broker'}] 
  
   

});

module.exports =  mongoose.model('Campaign', campaignModel);