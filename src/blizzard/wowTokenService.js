import axios from 'axios'

class WowTokenService {
  constructor () {
    this.tokenUrl = `https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=${process.env.BLIZZARD_CLIENT_ID}&client_secret=${process.env.BLIZZARD_CLIENT_SECRET}`
    this.priceUrl = 'https://us.api.battle.net/data/wow/token/?namespace=dynamic-us&locale=en_US&access_token='

    this.accessToken = ''
    axios.get(this.tokenUrl)
      .then((res) => {
        this.accessToken = res.data.access_token
      })
  }

  getPrice () {
    let url = `${this.priceUrl}${this.accessToken}`

    return axios.get(url)
      .then((res) => {
        return res.data.price
      })
  }
}

export default WowTokenService
