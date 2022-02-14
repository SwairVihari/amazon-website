const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class SmsSender{
    constructor(leads,message,url){
      this.leads = leads   
      this.message = message
      this.url = url   
      console.log('sms sender')
    }

    async sendBulksSms(){
      for(let i = 0;i<this.leads.length;i++){
        let currentLead =  this.lead(this.leads[i].firstName,this.leads[i].lastName,this.leads[i].phone)
        if(i === 0)
        await this.sendSms(currentLead)
      }
    }

    lead(firstName,lastName,phone){
     return {
       firstName,
       lastName,
       phone
     }
    }

    async sendSms(lead){
      console.log(`Send sms ${lead.firstName}`)
      const from ='+12055395527';
      try {
        await client.messages.create({       
          body: this.message,
          from :from, 
          to: '+972532331705'
        });
        console.log('Request sent');
        return 'Success';
      } catch(error) {
        console.error(error);
        return 'Failed';
      }
    }

 
}

module.exports = SmsSender