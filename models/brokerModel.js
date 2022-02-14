const mongoose = require('mongoose')

const brokerModel = mongoose.Schema({
     brokerName :{
         type : String,
         required : true
     },
     isActive:{
         type : Boolean,
         required : true
     }
     
})

module.exports = mongoose.model('Broker',brokerModel)