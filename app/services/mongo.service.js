const { MongoClient } = require("mongodb")
const AppConstants = require("../../config/constants")

class MongoDBService {
  db
  constructor() {
    this.conncet()
  }

  conncet = async () => {
    try {
      let client = await MongoClient.connect(AppConstants.DATABASE.DB_URL)
      this.db = client.db(AppConstants.DATABASE.DB_NAME)
    } catch (err) {
      throw ("DB COnnection error", err)
    }
  }
  addSingleRow = async (collectionName, data) => {
    try {
      return await this.db.collectin(collectionName).insertOne(data)
    } catch (err) {
      throw "Insertion error"
    }
  }
}

module.exports = MongoDBService
