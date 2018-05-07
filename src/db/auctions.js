import dotenv from 'dotenv'
import assert from 'assert'
import MongoDb from 'mongodb'

dotenv.load()

class Auctions {
  constructor () {
    this.collection = 'auction_house'
    this.dbUrl = process.env.MONGODB_URL
    this.dbName = process.env.MONGODB_NAME
    this.MongoClient = MongoDb.MongoClient
  }

  findByItemId (id) {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!id) reject(new Error('id is required'))

      _this.MongoClient.connect(_this.dbUrl)
        .then((client) => {
          client.db(_this.dbName)
            .collection(_this.collection)
            .find({'item': id})
            .toArray()
            .then((result) => {
              console.log(result)
              client.close()
              resolve(result)
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  load (auctions) {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!auctions) reject(new Error('auctions is required'))

      _this.MongoClient.connect(_this.dbUrl)
        .then((client) => {
          client.db(_this.dbName)
            .collection(_this.collection)
            .insertMany(auctions)
            .then((result) => {
              client.close()
              resolve(`added ${result.insertedCount} auctions`)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  save (auction) {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!auction) reject(new Error('auction is required'))

      _this.MongoClient.connect(_this.dbUrl)
        .then((client) => {
          client.db(_this.dbName)
            .collection(_this.collection)
            .insertOne(auction)
            .then((result) => {
              client.close()
              resolve('acution added to db')
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default Auctions
