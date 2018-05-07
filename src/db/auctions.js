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

  findByItemId (id, callback) {
    assert.notEqual(id, null)

    // let self = this
    // self.client.connect(self.dbUrl)
    //   .then((err, db) => {
    //     assert.equal(err, null)

    //     db.collection(self.collection)
    //       .find({ 'item': id })
    //       .toArray((err, docs) => {
    //         assert.equal(err, null)
    //         db.close()
    //         typeof callback === 'function' && callback(docs)
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
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
