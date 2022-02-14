const express = require('express');
const clickRouter = express.Router();
const clickModel = require('./../models/clickModel.js');
const campaignModel  = require('../models/camapaignModel.js');
const axios =  require('axios');
const errorConstants = require  ('../constants/errorConstants.js');
const BotInspector = require('bot-inspector');
require('dotenv').config()
const IphubChecker = require('../services/IphubChecker.js')

clickRouter.get('/:clickId' ,async  (req,res) =>{
 const id =  req.params.clickId;
 const click = await clickModel.findById(id);
 res.send(click);
});

clickRouter.get('/',async (req,res)=>{
  const clicks  =  await clickModel.find({});
  res.send(clicks);
});




clickRouter.post('/' ,async (req,res) =>{
// wrong geo works,  bot works , 
 let  isBot = false;
  const options = {
    customCrawlers: ['spiderbot'] ,
    headers: req.headers 
  }
  const inspector = BotInspector(options);
  if (inspector.isCrawler()) {
    isBot = true;
    console.log('isbot',isBot);
  }
  
  
  const {campaignId, urlReferrer,tracked} = req.body; 
  console.log('urlReferrer',urlReferrer)
  let campaign ='';
   try{
    campaign = await campaignModel.findById(campaignId);
  }catch(e){
    console.log(e);
    res.status(204).json({isValid:false});
  }

  if(campaign === null || campaign === ''){
    res.status(204).json({isValid:false});
  }
  console.log('campaign',campaign)
  const tokens = req.query; 

  const deviceType = req.device.type.toUpperCase(); 'PHONE/DESKTOP/TABLET'
  const userAgent = req.headers['user-agent']; 
  console.log('device',deviceType)
  console.log('user',userAgent)
  if(userAgent.includes('facebookexternalhit/1.1') || userAgent.includes('PostmanRuntime/7.26.5') || userAgent.includes('AdsBot')){
   isBot = true;
  }

 
 let  ip =  req.ip
 if(process.env.ENVIROMENT === "DEVELOPMENT"){
  ip = "84.95.68.29"  
 }

 console.log('process.env.ENVIROMENT',process.env.ENVIROMENT)
 console.log('ip',ip)
 let ipInfo = ''
 try{
   ipInfo = await axios.get(`http://geolocation-db.com/json/${ip}`);
   console.log('ipInfo',ipInfo.data)
} catch(error){
  console.log(error)
}
   
 const geoCode  = ipInfo.data.country_code;
 const capitalGeos = campaign.geos.map(geo =>{return geo.toUpperCase()});
 const capitalDevices =  campaign.devices.map(device =>{return device.toUpperCase()});
 const geoMatch =  capitalGeos.includes(ipInfo.data.country_code);
 const deviceMatch = capitalDevices.includes(deviceType);
 //const isValidReferrer =  urlReferrer.includes('youtube')
 console.log('/////////////////')
 console.log('geoMatch',geoMatch)
 /// some bug on geomatchh


 console.log('/////////////////')
 console.log('deviceMatch',deviceMatch)
 console.log('/////////////////')


 
let isValidClick = true;
let clickMessage  = 'clickMessage';
if(!geoMatch){
  isValidClick = false;
  clickMessage += ' '+errorConstants.wrongGeo;
}

if(!deviceMatch){
  isValidClick = false;
  clickMessage += ' '+errorConstants.wrongDevice;
}

if(!campaign.isActive){
  isValidClick = false;
  clickMessage += ' '+ errorConstants.campaignNotActive;
}

if(isBot){
  isValidClick = false;
  clickMessage += ' '+errorConstants.isBot;
}

if(!tracked){
 isValidClick = false
 clickMessage += ' '+errorConstants.notTracked
}

// if(!isValidReferrer){
//   isValid =  false
//   clickMessage += ' '+errorConstants.urlRefferer
// }

const click = new clickModel({
  tokens,
  geoCode, 
  ip,
  isBot,
  device:deviceType,
  userAgent,
  isValidClick,
  clickMessage,
  campaign,
  urlReferrer,
  tracked
});
//const link = isValidClick ? campaign.offerLink : '';
const saved =  await click.save();

// run ip hub checker
if(isValidClick){
 try{
  const iphubChecker = new IphubChecker(ip)
  const apiValid = await iphubChecker.getIpScore()
  if(!apiValid){
    saved.isValidClick = apiValid,
    clickMessage = errorConstants.apiBlock;
  }else{
    clickMessage = 'Approved'
  }
 } catch(error){
   apiValid= false
    console.log('IphubChecker error')
    console.log(error)
    console.log('///////////')
}
 
  
}


res.status(200).json({isValid:saved.isValidClick , clickMessage : clickMessage});
});

module.exports = clickRouter;