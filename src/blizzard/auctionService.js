import axios from 'axios'
import _ from 'lodash'
import Auctions from '../db/auctions'

class AuctionHouseService {
  constructor () {
    this.auctions = new Auctions()
    this.url = `https://us.api.battle.net/wow/auction/data/zuljin?locale=en_US&apikey=${process.env.BLIZZARD_CLIENT_ID}`
  }
  scan () {
    let self = this
    let docurls = []
    axios.get(self.url)
      .then((res) => {
        _.each(res.data.files, (file) => {
          docurls.push(file.url)
        })
      })
      .then(() => {
        _.each(docurls, (url) => {
          let data = ''
          axios.get(url)
            .then((res) => {
              data = res.data
            })
            .then(() => {
              _.each(data.auctions, (auction) => {
                self.auctions.save(auction)
              })
            })
        })
      })
  }
}

export default AuctionHouseService
