const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const funnelModel = new Schema({
    name:{
        type : String,
        required : true
    },
    geo:{
        type : String,
        required : true
    },
    language :{
        type : String,
        required : true
    },
    isActive :{
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model('Funnel',funnelModel)