const express = require('express');
const leadRouter  = express.Router();
const leadModel = require('./../models/leadModel.js');
const smsCampaignModel  = require('../models/smsCampaignModel.js');
const smsUpSellModel = require('../models/smsUpsellCampaignModel.js');

const smsSentModel = require('../models/smsSentModel.js');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

leadRouter.post('/' ,async (req,res) =>{
     
    const  {phone,geo,landingPage,smsId} = req.body;
    const exists = await checkExists(phone);
    if(exists){
      res.send({smsStatus :  "Exists" });
      return;
    }  
    const lead = new leadModel({
        phone,
        geo,
        landingPage
    })

    const smsCampaign = await smsCampaignModel.findById(smsId).populate('smsUpsell');


    const savedLead  = await lead.save();
    const body = smsCampaign.message+' '+smsCampaign.link;
    const from ='+12055395527'; 
    const smsStatus = await sendTextMessage(body,from,phone);

    
    const smsSent  =  new smsSentModel({
        sms : smsCampaign._id,
        lead : savedLead._id,
        status :smsStatus
    });

    
    const savedSms = await smsSent.save();

    // if(smsCampaign.smsUpsell.active){
    //   setTimeout(()=>{
    //     console.log('sms upsell in timeout',smsCampaign.smsUpsell);
    //    const smsUpsellStatus = await sendTextMessage(smsCampaign.smsUpsell,from,phone);
    //    console.log('smsUpsellStatus',smsUpsellStatus);
   
    //  },1000);
    // }
   

   
    //res.send({lead :savedLead});
    res.send({lead :savedLead , smsStatus :  smsStatus });
});



const sendTextMessage =  async (body,from ,to)=>{
    try {
      await client.messages.create({       
        body: body,
        from :from, 
        to: to
      });
      console.log('Request sent');
      return 'Success';
    } catch(error) {
      console.error(error);
      return 'Failed';
    }
 }


 const checkExists = async phone =>{
   let result = false;
   const leads =  await leadModel.find({phone : phone}).exec();
   if(leads.length > 2){
    console.log('lc','>2');
     result = true;
   }else {
    console.log('lc','false');
     result = false;
   }
   return result;
 }
module.exports = leadRouter;