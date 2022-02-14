const mongoose = require('mongoose');

const smsSentModel = mongoose.Schema({
    sms :{type: mongoose.Schema.Types.ObjectId, ref: 'SmsCampaign'},
    smsUpsell : {type: mongoose.Schema.Types.ObjectId, ref: 'SmsUpsellCampaign'},
    lead :{type: mongoose.Schema.Types.ObjectId, ref: 'Lead'},
    status :{
       type : String,
    }
});

module.exports = mongoose.model('SmsSent',smsSentModel);