const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brokerResponseModel = new Schema({
    leadEmail:{
        type : String,
        required : true
    },
    broker:{
        type : String,
        required : true
    },
    apiResponse:{
        type : String,
        required : true
    },
    brokerLeadId:{
        type : String
    },
    leadId :{type: mongoose.Schema.Types.ObjectId, ref: 'CryptoLead'}
},{ timestamps: true })


module.exports = mongoose.model('BrokerResponse',brokerResponseModel)