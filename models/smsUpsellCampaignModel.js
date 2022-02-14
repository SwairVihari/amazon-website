const mod = require('geoip-lite');
const mongoose = require('mongoose');

const smsUpsellModel = mongoose.Schema({
    active: {
     type: Boolean,
     required : true
    },
    message:{
        type : String,
        required :true
    }, 
    link :{
      type : String,
      required :true
    }
});

module.exports = mongoose.model('SmsUpsellCampaign',smsUpsellModel);