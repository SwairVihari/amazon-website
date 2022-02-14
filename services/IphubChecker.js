const axios = require('axios')

class IphubChecker{
    constructor(ip){
        this.ip =  ip
    }

    async getIpScore (){
      let block = 2
      const apiKey = process.env.IPHUB_API_KEY
      const response =  await axios.get(`http://v2.api.iphub.info/ip/${this.ip}`,{
        headers: {
            'X-Key': apiKey
        }
      })
      try{
        block = response.data.block
        console.log(response.data)
      }catch(err){
        console.log(err)
        return false
      }
     //return block === 0
     return block !== 1
    }
}

module.exports = IphubChecker