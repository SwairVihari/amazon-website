const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cryptoLeadModel = new Schema({
    firstName :{
        type : String ,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required:  true
    },
    prefix:{
        type : String,
        required:  true
     },
    phone :{
        type : String,
        required : true
    },
    userIp:{
        type : String,
        required : true
    },
    campId:{
        type : String
    },
    geo:{
        type : String  
    },
  
},{ timestamps: true })

module.exports = mongoose.model('CryptoLead',cryptoLeadModel)