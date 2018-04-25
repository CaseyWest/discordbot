import assert from 'assert'
import Db from './db'

class Auctions {
  constructor () {
    this.collection = 'auction_house'
    this.db = new Db()
    this.client = this.db.client()
  }

  findByItemId (id, callback) {
    assert.notEqual(id, null)

    let self = this
    self.client.connect(self.db.url(), (err, db) => {
      assert.equal(err, null)

      db.collection(self.collection)
        .find({ 'item': id })
        .toArray((err, docs) => {
          assert.equal(err, null)
          db.close()
          typeof callback === 'function' && callback(docs)
        })
    })
  }

  save (auction, callback) {
    assert.notEqual(auction, null)

    let self = this
    self.client.connect(self.db.url(), (err, db) => {
      assert.equal(err, null)

      db.collection(self.collection)
        .insertOne(auction, (err, r) => {
          assert.equal(err, null)
          assert.equal(r.insertedCount, 1)
          db.close()
          typeof callback === 'function' && callback()
        })
    })
  }
}

export default Auctions
