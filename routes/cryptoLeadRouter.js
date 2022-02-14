const express = require('express')
const cryptoLeadRouter = express.Router()
const cryptoLeadModel = require('./../models/cryptoLeadModel.js')
const testLeadModel = require('./../models/testLeadModel.js')
const LeadDispatcher = require('./../services/LeadDispatcher/LeadDispatcher.js')
const  campaignModel = require('../models/camapaignModel.js')
const brokerResponseModel = require('./../models/brokerResponseModel.js')
require('dotenv').config()
var mongoose = require('mongoose');
const axios = require('axios')

const leadsForTest = require('./../models/leadModel.js')
const cryptoLeads =  require('./../models/cryptoLeadModel.js')
cryptoLeadRouter.route('/c_lead')
    .get(async (req, res) => {
        //const leads = await cryptoLeadModel.find({}).sort( { $natural:-1 } )
        const countPerPage = 20
        const pageNumber = req.query.pageNumber-1
        console.log('pageNumber',pageNumber)
        const leadsCount  =  await cryptoLeads.find({}).count().exec()
        const maxPage = leadsCount/countPerPage
        const allLeads =await cryptoLeads.find({}).sort( { $natural:-1 } ).limit(countPerPage)
        console.log('allLeads')
        console.log('allLeads',allLeads)
         let leads = []
        try{
            leads = await  cryptoLeads.find({}).sort( { $natural:-1 } )
            .skip((pageNumber) * countPerPage)
            .limit(countPerPage)
        }catch(error){
             console.log(error)
        }



        res.send({leads,maxPage})
    })
    .post(async (req, res) => {
        let status = 'Not saved'
        const { firstName, lastName, email, prefix, phone, countryCode,campId, trackingId} = req.body
        const ip = req.ip
      //  const platform = req.body.platform ? req.body.platform : "DEFAULT"

       // console.log('PLATFORM',platform)
      //  const cloakerCamp = await campaignModel.findById(trackingId,'campaignName source')
        

        const leadCount = await cryptoLeadModel.count({ email: email }).exec()
      //  console.log('email exists', leadCount)
       
        if (process.env.ENVIROMENT === "PRODUCTION" && leadCount === 0) {
          const lead = {
            firstName,
            lastName,
            email,
            prefix,
            phone,
            userIp:ip,
            campId,
            countryCode,
            trackingId
           }
          try{

            const response = await axios.post(`https://www.crmgoaway.online/api/send/lead`,lead)
            status = response.data.status
          } catch(error){
            console.log(error)
          }


         
        }
        //

        //     const lead = new cryptoLeadModel({
        //         firstName,
        //         lastName,
        //         email,
        //         prefix,
        //         phone,
        //         funnelId,
        //         userIp: ip,
        //         campId,
        //         geo: countryCode
        //     })


            // const savedLead = await lead.save()
            // console.log('saved',savedLead._id)
            // status = savedLead._id !== null || savedLead._id !== ''
            // const leadDispatcher = new LeadDispatcher(savedLead,cloakerCamp,countryCode)

            // let apiResponse;
            // try {
               
            //     if(platform === "TCM"){
            //       console.log('TCM is the chosen one')
            //         apiResponse = await leadDispatcher.sendTopConvert() 
            //       console.log('apiResponse tcm',apiResponse)
            //       if (!apiResponse.isSaved){
            //           console.log('not saved tcm')
            //           apiResponse = await leadDispatcher.sendLeadTcm()
            //       }
            //     }else if(platform === "Gladio"){
            //         console.log('Gladio is the chosen one')
            //         apiResponse = await leadDispatcher.sendLeadGladio()
            //         if (!apiResponse.isSaved){
            //             console.log('not saved Gladio')
            //         //  apiResponse = await leadDispatcher.sendTopConvert()  
            //         }
            //     }else{                    
            //         console.log('DEFAULT is the chosen one')
            //         apiResponse = await leadDispatcher.sendTopConvert()  
            //         if (!apiResponse.isSaved && countryCode !== 'TH') {                    
            //                if(countryCode === 'ZA' || countryCode === 'za'){
            //                 apiResponse = await leadDispatcher.sendLeadTcm()                           
            //                } else{
            //                 apiResponse = await leadDispatcher.sendLeadGladio()
            //                }                       
                           
            //         }
            //     }
            //    console.log('apiResponse apiResponse', apiResponse)
            // } catch (error) {
            //     console.log('saved error', error)
            // }
            // const stringId = savedLead._id.toString()
            // if(apiResponse.isSaved){
                
            // const bresponse = new brokerResponseModel({
            //     leadEmail: lead.email,
            //     broker: apiResponse.network,
            //     apiResponse: apiResponse.isSaved,
            //     brokerLeadId : apiResponse.leadId,
            //     leadId :  stringId
            // })
         
           //const savedResponse =  await bresponse.save()
           //console.log("savedResponse",savedResponse.populate('lead'))      
           //}   
        // }
        // else if (leadCount === 0 && process.env.ENVIROMENT !== "DEVELOPMENT") {
            
        //     const lead = new testLeadModel({
        //         firstName,
        //         lastName,
        //         email,
        //         prefix,
        //         phone,
        //         funnelId,
        //         userIp: ip,
        //         geo: countryCode
                
        //     })

        //     const saved = await lead.save()
        //     status = saved._id !== null || saved._id !== ''
        // }

        res.send({ savedStatus: status })
    })




module.exports = cryptoLeadRouter
