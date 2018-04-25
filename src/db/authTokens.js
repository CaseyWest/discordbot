import assert from 'assert'
import Db from './db'

class AuthTokens {
  constructor () {
    this.collection = 'auth'
    this.db = new Db()
    this.client = this.db.client()
  }

  get (authType, callback) {
    assert.notEqual(authType, null)

    let self = this
    self.client.connection(self.db.url(), (err, db) => {
      assert(err, null)

      db.collection(self.collection)
        .findOne({'auth_type': authType}, (err, doc) => {
          assert.equal(err, null)
          db.close()
          typeof callback === 'function' && callback(doc)
        })
    })
  }

  save (authObj, callback) {
    let self = this
    self.client.connection(self.db.url(), (err, db) => {
      assert(err, null)

      db.collection(self.collection)
        .insertOne(authObj, (err, r) => {
          assert.equal(err, null)
          assert.eqaual(r.insertedCount, 1)
          db.close()
          typeof callback === 'function' && callback()
        })
    })
  }
}

export default AuthTokens
