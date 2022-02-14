const mongoose = require('mongoose');

const smsCampaignModel =  mongoose.Schema({
  smsUpsell: {type: mongoose.Schema.Types.ObjectId, ref: 'SmsUpsellCampaign'},
  message:{
      type : String,
      required :true
  }, 
  link :{
    type : String,
    required :true
  }
});

module.exports = mongoose.model('SmsCampaign',smsCampaignModel);