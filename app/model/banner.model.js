const mongoose = require("mongoose")
const BannerSchemaDef = new mongoose.Schema(
  {
    title: String,
    image: {
      type: String,
      require: true,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "incative",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: false,
    },
  },
  {
    autoIndex: true,
    timestamps: true,
  }
)
const BannerModel = mongoose.model("Banner", BannerSchemaDef)

module.exports = BannerModel
