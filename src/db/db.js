import Mongodb from 'mongodb'

class Db {
  constructor () {
    this.db = new Mongodb()
  }

  client () {
    return this.db.MongoClient
  }

  dbName () {
    return 'discordbot'
  }

  getId (id) {
    return this.db.ObjectID(id)
  }

  server () {
    return process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017'
  }

  url () {
    return `${this.server()}/${this.dbName()}`
  }
}

export default Db
