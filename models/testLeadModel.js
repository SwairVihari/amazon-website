const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testLeadModel = new Schema({
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
    geo:{
        type : String  
    }
},{ timestamps: true })

module.exports = mongoose.model('TestLead',testLeadModel)