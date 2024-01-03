const mongoose = require("mongoose")

const UserSchemaDef = new mongoose.Schema(
  {
    //table defination
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    address: String,
    role: {
      type: String,
      emum: ["admin", "customer", "suppliar"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    phone: {
      type: String,
      min: 7,
      max: 15,
    },
    image: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    // options
    autoIndex: true,
    autoCreate: true,
    timestamps: true,
  }
)

const UserModel = mongoose.model("User", UserSchemaDef)
module.exports = UserModel
