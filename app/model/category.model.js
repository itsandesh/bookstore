const mongoose = require("mongoose")
const CommonSchema = require("./common-schema")
const CategorySchema = new mongoose.Schema(
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

    createdBy: CommonSchema.createdBy,

    featured: {
      type: Boolean,
      deafault: false
    }

  },

  {
    autoIndex: true,
    timestamps: true,
    autoCreate: true
  }
)

const CategoryModel = mongoose.model("bookCat", CategorySchema)

module.exports = CategoryModel
