const axios = require('axios')
const cryptoLeadModel = require('../../models/cryptoLeadModel.js')
const responseFailed = require('../../models/brokerResponseFailed.js')
const { response } = require('express')
require('dotenv').config()

class LeadDispatcher {
    constructor(lead,campaign,countryCode) {
        this.lead = lead
        this.campaign = campaign,
        this.countryCode = countryCode
        
    }

    // async dispatchLead(){
    //     //console.log('dispatc leads',this.campaign.brokers)
    //     let brokerList  = this.campaign.brokers.filter((broker)=>{
    //         return broker.isActive === true
    //     })
       
    //    let sendBrokers = brokerList.map(broker=>{
    //     return   broker.brokerName
    //    })

    //    sendBrokers.sort(() => Math.random() - 0.5)

    //     for(let i=0;i< sendBrokers.length ;i++){
    //         console.log(sendBrokers[i])
    //         if(sendBrokers[i] === 'TOP_CONVERT'){
    //             console.log('Broker is top convert')
    //         }else if(sendBrokers[i] === 'GLADIONET'){
    //             console.log('GLADIONET')
    //         }
    //     }
    // }

    async sendLeadTcm() {
        const network = "TCM"
        let savedLead = 'Not saved'
        let isSaved = false
        const url = 'https://platform.epclabs.co/api/signup/procform'

        const apiKey = process.env.TCM_API_KEY
        const password = '1' + this.lead.firstName+"!"+this.lead.firstName.charAt(0)

        const trackboxLeadFormat = {
            "ai": "2958204",
            "ci": "1",
            "gi": "96",
            "userip": this.lead.userIp,
            "firstname": this.lead.firstName,
            "lastname": this.lead.lastName,
            "email": this.lead.email,
            "password": password,
            "phone": this.lead.phone,
            "prefix": this.lead.prefix,
            "fallback": true,
            "sub": this.campaign.campaignName,
            "so": this.campaign.source,
            "MPC_1": this.lead.campId
        }

        console.log('TCM lead', trackboxLeadFormat)
        const headers = {
            'Content-Type': 'application/json',
            'x-trackbox-username': 'User1193',
            'x-trackbox-password': 'GoAway123!',
            'x-api-key': apiKey
        }
        console.log('TCM apiKey', apiKey)
        try {
            
            let savedLead = await axios.post(url, trackboxLeadFormat, {
                headers: headers
            })

            isSaved = savedLead.data.status
            console.log('send TCM',savedLead.data)
            console.log('saved lead TCM',savedLead.data)
            if(!isSaved){
                console.log('tcm not saved')
                this.savedFailedResponse(network,'No error')
            }
        } catch (error) {
            console.log('lead error',error)
            savedLead = 'lead save error' + error
        }
        
        return {isSaved,network}
    }

   

    async sendTopConvert() {
        const network = "Convert Square"
        let isSaved = false
        const topConvertLead = {
            "name": this.lead.firstName,
            "lastname": this.lead.lastName,
            "email": this.lead.email,
            "phone": this.lead.phone,
            "country_id": this.countryCode,
            "ip": this.lead.userIp,
            "campId":this.lead.campId,      
            "source":this.campaign.source,
            "campaignName":this.campaign.campaignName 
    }


    const url = 'https://invester-2021.xyz/app/api/lead/monstrack'
  
    let result =  await axios.post(url, topConvertLead)
    console.log('topConvertLead',topConvertLead)
    console.log('result convert',result.data)
    isSaved = result.data.isSaved
    let leadId = result.data.leadId
    
    if(!isSaved){
        // save failed
        this.savedFailedResponse(network,result.data.errorM)
    }
     
   
    return {isSaved,network ,leadId}
    }

    async sendMagnus (){
    const network = "Magnus"
    let isSaved = false
    const magnusLead = {
        "name": this.lead.firstName,
        "lastname": this.lead.lastName,
        "email": this.lead.email,
        "phone": this.lead.phone,
        "country_id": this.countryCode,
        "ip": this.lead.userIp,
        "campId":this.lead.campId,
        "source":this.campaign.source,
        "campaignName":this.campaign.campaignName     
}


const url = 'https://invester-2021.xyz/app/api/lead/magnus'

let result =  await axios.post(url, magnusLead)
console.log('magnusa saved',result.data)
isSaved = result.data.isSaved
leadId = result.data.leadId

if(!isSaved){
    // save failed
    this.savedFailedResponse(network,result.data.errorM)
}

return {isSaved,network ,leadId}
}

async sendSupremeMedia() {
    const network = "Supreme Media"
    let savedLead = "Not saved"
    let isSaved = false
    let leadId = '0'
    const url = "https://api.sdkapilead.com/v2/affiliates/lead/create"
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ciI6IjMiLCJhZiI6IjI5NCIsIm9mIjoiOTgiLCJzdCI6IjEiLCJBUElfVElNRSI6MTYxNjEzOTc0OH0.JkSmLBDPzj0QsCCArQqNZb6710zDHOna6fIDIEMuE00"
    const supremeLead = {
        "firstname": this.lead.firstName,
        "lastname": this.lead.lastName,
        "email": this.lead.email,
        "password": "123AbcTH",
        "phone": this.lead.phone,
        "ip": this.lead.userIp,
        "country_code": this.countryCode,
        "source": this.campaign.source,
        "aff_sub": this.lead.campId
    }

    const headers = {
        'Content-Type': 'application/json',
        'Token': apiKey
    }
    try {
        savedLead = await axios.post(url, supremeLead, {
            headers: headers
        })
        isSaved = savedLead.data.status
        leadId = savedLead.data.result.lead_id
        if(!isSaved){
            // save failed
            this.savedFailedResponse(network,'No error')
        }
      
    } catch (error) {
        console.log('Supreme media error', error)
        // save failed
        this.savedFailedResponse(network,error.toString())
    }
  
    return {isSaved,network,leadId}
}


async sendLeadGladio() {
        const network = "Gladio"
        let savedLead = 'Not saved'
        let isSaved = false
        const url = 'https://platform.gladionet.com/api/signup/procform'
        let leadId= '0'
        
        const pass = '1'+this.lead.firstName.charAt(0).toUpperCase() + this.lead.firstName + Math.floor(Math.random() * 11)
        let password = pass.length > 11  ? pass.substring(0, 11) : pass
                    

        const gladioLead = {
            "ai": "2958170",
            "ci": "1",
            "gi": "136",
            "userip": this.lead.userIp,
            "firstname": this.lead.firstName,
            "lastname": this.lead.lastName,
            "email": this.lead.email,
            "password": password,
            "phone": this.lead.phone,
            "prefix": this.lead.prefix,
            "fallback": true,
            "sub": this.campaign.campaignName,
            "so": this.campaign.source,
            "MPC_1": this.lead.campId
        }

        console.log('gladio', gladioLead)
        const headers = {
            'Content-Type': 'application/json',
            'x-trackbox-username': 'Charlie',
            'x-trackbox-password': 'GoAway123!',
            'x-api-key': '2643889w34df345676ssdas323tgc738'
        }

        try {
            savedLead = await axios.post(url, gladioLead, {
                headers: headers
            })

            isSaved = savedLead.data.status
            console.log('saved lead gladio',savedLead.data)
            if(!isSaved){
                // save failed
                this.savedFailedResponse(network,'No error')
            }
        } catch (error) {
            console.log('lead error',error)
            savedLead = 'lead save error' + error
            
        }
      
        return {isSaved,network,leadId}
    }


 async savedFailedResponse (network,errorM){
    const res = new responseFailed({
        network,
        leadEmail:this.lead.email,
        errorMessage: errorM
    })

    const errorSaved = await res.save()
    return errorSaved._id !== '' || errorSaved._id !== undefined
 }
// async saveResponse(network, message) {
//     const response = new brokerResponseModel({
//         leadEmail: this.lead.email,
//         broker: network,
//         apiResponse: message
//     })
    
//     const savedMessage = await response.save()
//     return savedMessage
// }
}

module.exports = LeadDispatcher