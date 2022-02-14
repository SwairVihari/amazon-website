const mongoose = require('mongoose');

const leadModel = mongoose.Schema({
    phone :{
        type : String,
        required : true
    },
    geo :{
        type : String,
        required : true
    },
    landingPage :{
        type : String,
        required : true
    }
},{ timestamps: true })

module.exports =  mongoose.model('Lead',leadModel);