const express = require('express')
const smsRouter = express.Router()
const cryptoLeadModel = require('./../models/cryptoLeadModel.js')
const SmsSender = require('./../services/SmsService/SmsSender.js')


smsRouter.use('/send', async(req,res)=>{
    
    // select leads by geo if no geo make it za and between dates
    const {countryCode,startDate,endDate,smsUrl,smsMessage} = req.body
    
    console.log('country code',countryCode.value)
    console.log('country startDate',startDate)
    console.log('country endDate',endDate)
    console.log('country smsUrl',smsUrl)
    console.log('country smsMessage',smsMessage)

     const leadsNoGeo = await cryptoLeadModel.find({}).exec()
     const leadsGeo = await cryptoLeadModel.find({ geo: countryCode.value }).exec()
     const smsLeads =  leadsGeo.concat(leadsNoGeo)
      
     const smsSender =  new SmsSender(smsLeads,smsMessage,smsUrl)
     const smsResponse = await smsSender.sendBulksSms()
  
  //  console.log(responseSend)
    res.send('hi')
})

module.exports = smsRouter