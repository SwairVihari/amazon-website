const express = require('express');
const campaignRouter  = express.Router();
const campaignModel = require('../models/camapaignModel.js');
require('./../models/brokerModel.js')

campaignRouter.get('/:campaignId',async (req,res) =>{
  
  const campaign = await campaignModel.findById(req.params.campaignId); 
  res.send(campaign);
});


campaignRouter.get('/',async (req,res) =>{
    const campaigns  = await campaignModel.find({}).populate('brokers').exec();
  
    
    res.send(campaigns);
});
   

campaignRouter.post('/' , async (req,res) =>{

const {campaignName , devices, geos,isActive,offerLink} = req.body;
const capitalGeos =     geos.map(geo =>{return geo.toUpperCase()})
const capitalDevices  =   devices.map(device=>{return device.toUpperCase()});
const campaign = new campaignModel({
  campaignName :campaignName ,
  devices :capitalDevices ,
  geos : capitalGeos,
  isActive :isActive,
  offerLink :offerLink
});
const saved =  await campaign.save()
res.send({campaignId:saved._id , saved: true});
});


campaignRouter.delete('/:campaignId',async (req,res) =>{
   const deleted = await campaignModel.findOneAndDelete({_id:req.params.campaignId}).exec();
   const campaigns  = await campaignModel.find({});
   res.send({deleted: deleted , campaigns: campaigns});
});


campaignRouter.post('/update/:campaignId' ,  async (req,res) =>{

   const {campaignName , devices, geos,isActive,offerLink} = req.body;  
   const capitalGeos =  geos.map(geo =>{return geo.toUpperCase()})
   const capitalDevices  =  devices.map(device=>{return device.toUpperCase()});

  const updated  = await campaignModel.findByIdAndUpdate({_id:req.params.campaignId},{
     campaignName :campaignName,
     devices :capitalDevices,
     geos :capitalGeos,
     isActive :isActive,
     offerLink :offerLink
   },{new: true});
   res.send(updated);
});

module.exports =  campaignRouter;