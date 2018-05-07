import dotenv from 'dotenv'
import axios from 'axios'

dotenv.load()

class ItemService {
  constructor () {
    this.baseUrl = 'https://us.api.battle.net/wow/item/'
    this.urlQuery = `?locale=en_US&apikey=${process.env.BLIZZARD_CLIENT_ID}`
  }

  getItemById (itemId) {
    return new Promise((resolve, reject) => {
      if (!itemId) reject(new Error('itemId is a required filed'))

      axios
        .get(`${this.baseUrl}/${itemId}${this.urlQuery}`)
        .then((res) => {
          return res.data
        })
        .then((item) => {
          resolve(item)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default ItemService
