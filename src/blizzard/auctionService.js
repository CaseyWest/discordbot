import _ from 'lodash'
import axios from 'axios'
import fs from 'fs'
import Auctions from '../db/auctions'

class AuctionHouseService {
  constructor () {
    this.auctions = new Auctions()
    this.url = `https://us.api.battle.net/wow/auction/data/zuljin?locale=en_US&apikey=${process.env.BLIZZARD_CLIENT_ID}`
  }

  loadDb () {
    let _this = this
    return new Promise((resolve, reject) => {
      fs.readFile('./dl/ahdata.json', 'utf-8', (err, data) => {
        if (err) reject(err)

        _this.auctions
          .load(JSON.parse(data).auctions)
          .then((msg) => {
            resolve(msg)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  }

  scan () {
    return axios.get(this.url)
      .then((res) => {
        return res.data.files[0].url
      })
      .then((url) => {
        return axios.get(url)
          .then((res) => {
            return res.data
          })
          .then((data) => {
            fs.writeFileSync('./dl/ahdata.json', JSON.stringify(data), 'utf-8')
            return 'scan complete'
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default AuctionHouseService
