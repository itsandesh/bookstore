const CategoryModel = require("../model/category.model")
const Joi = require("joi")

class CategoryService {
  validateRequest = data => {
    try {
      let categorySchema = Joi.object({
        title: Joi.string().required(),

        parent: Joi.string().allow(null, ''),

        status: Joi.string().allow("active", "inactive").default("inactive"),

        featured: Joi.boolean().default(false),

        image: Joi.string().empty(),


      })
      let validate = categorySchema.validateAsync(data)
      return validate
    } catch (err) {
      if (err?.details) {
        throw err?.details?.[0].message
      }
    }
  }
  getCount = async () => {
    return CategoryModel.count()
  }
  getAllCategory = async (config = { page: 0, perPage: 10 }) => {
    try {
      let skip = config.page * config.perPage
      let data = await CategoryModel.find()
        .populate("parent")
        .sort({ _id: "desc" })
        .skip(skip)
        .limit(config.perPage)
      return data
    } catch (err) {
      throw err
    }
  }
  getActiveCategory = async () => {
    try {
      let data = await CategoryModel.find({
        status: "active",
      })
        .populate("parent")
        .sort({ _id: "desc" })
      return data
    } catch (err) {
      throw err
    }
  }
  getAllFeaturedCategory = async () => {
    try {
      let data = await CategoryModel.find({
        featured: true,
        status:"active"
      })
        .populate("parent")
        .sort({ _id: "desc" })
      return data
    } catch (err) {
      throw err
    }
  }
  storeCategory = async data => {
    try {
      let categoryObj = await CategoryModel(data)
      return categoryObj.save()
    } catch (err) {
      throw err
    }
  }
  updateCategory = async (id, data) => {
    try {
      let response = await CategoryModel.findByIdAndUpdate(id, {
        $set: data,
      })
      return response
    } catch (err) {
      throw err
    }
  }
  getCategoryById = async id => {
    try {
      let response = await CategoryModel.findById(id).populate("parent")
      return response
    } catch (err) {
      throw err
    }
  }
  deleteById = async id => {
    try {
      let response = await CategoryModel.findByIdAndRemove(id)
      return response
    } catch (err) {
      throw err
    }
  }
}
const categoryService = new CategoryService()
module.exports = categoryService
