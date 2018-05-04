import dotenv from 'dotenv'
import Mongodb from 'mongodb'

class Db {
  constructor () {
    dotenv.load()
    this.db = Mongodb()
  }

  client () {
    return this.db.MongoClient
  }

  dbName () {
    return process.env.MONGODB_DB_NAME || 'discordbot'
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
