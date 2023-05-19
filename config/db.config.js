const mongoose = require("mongoose")
const AppConstants = require("./constants")

mongoose
  .connect(AppConstants.DATABASE.DB_URL + AppConstants.DATABASE.DB_NAME)
  .then(() => {
    console.log("Connected to the database")
    // Additional logic after successfully connecting to the database
  })
  .catch(error => {
    console.error("Error connecting to the database:", error)
  })
