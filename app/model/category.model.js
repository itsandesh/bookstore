const mongoose = require("mongoose")
const CommonSchema = require("./common-schema")
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
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "bookCat",
      default: null
    },

    status: CommonSchema.status,

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
