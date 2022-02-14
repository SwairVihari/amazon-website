const mongoose = require('mongoose')
const Schema = mongoose.Schema
const brokerResponseModel = new Schema({
    network :{
        type: String,
        required: true
    },
    leadEmail :{
        type :String,
        required : true
    },
    errorMessage :{
        type: String,
        required: true
    },
   
},{ timestamps: true })


module.exports = mongoose.model('BrokerResponseFailed',brokerResponseModel)