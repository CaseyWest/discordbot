import dotenv from 'dotenv'
import assert from 'assert'
import MongoDb from 'mongodb'

dotenv.load()

class AuthTokens {
  constructor () {
    this.collection = 'auth'
    this.dbUrl = process.env.MONGODB_URL
  }

  get (authType, callback) {
    // assert.notEqual(authType, null)

    // let self = this
    // self.client.connection(self.dbUrl, (err, db) => {
    //   assert(err, null)

    //   db.collection(self.collection)
    //     .findOne({'auth_type': authType}, (err, doc) => {
    //       assert.equal(err, null)
    //       db.close()
    //       typeof callback === 'function' && callback(doc)
    //     })
    // })
  }

  save (authObj, callback) {
    // let self = this
    // self.client.connection(self.dbUrl, (err, db) => {
    //   assert(err, null)

    //   db.collection(self.collection)
    //     .insertOne(authObj, (err, r) => {
    //       assert.equal(err, null)
    //       assert.eqaual(r.insertedCount, 1)
    //       db.close()
    //       typeof callback === 'function' && callback()
    //     })
    // })
  }
}

export default AuthTokens
