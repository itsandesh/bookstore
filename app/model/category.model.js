const mongoose = require("mongoose")
const CategorySchemaDef = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },

    slug: {
      type: String,
      unique: true,
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

const CategoryModel = mongoose.model("Category", CategorySchemaDef)

module.exports = CategoryModel
