const mongoose = require('mongoose')

const tourPackageModel =  new mongoose.Schema({
 title:{
     type: String,
     required : true
 },
 city:{
     type : String,
     required : true
 },
 country :{
     type : String,
     required: true
 },
 price :{
     type :Number,
     required : true
 },
 image:{
     type : String ,
      required : true
 },
 description :{
     type : String ,
     required : true
 }
})

module.exports =  mongoose.model('TourPackage',tourPackageModel)