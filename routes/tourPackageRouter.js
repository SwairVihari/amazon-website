const express = require('express')
const tourPackageRouter = express.Router()
const tourPackageModel = require('./../models/tourPackageModel.js')

tourPackageRouter.get('/' , async(req,res)=>{

    const tours = await tourPackageModel.find({}).exec()
    res.send({tours})
})

module.exports = tourPackageRouter