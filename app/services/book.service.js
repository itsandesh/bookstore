const BookModel = require("../model/book.model")
const Joi = require("joi")

class BookService {
  validateRequest = data => {
    try {
      let bookSchema = Joi.object({
        title: Joi.string().required(),

        status: Joi.string().allow("active", "inactive").default("inactive"),

        image: Joi.string().empty(),
      })
      let validate = bookSchema.validateAsync(data)
      return validate
    } catch (err) {
      if (err?.details) {
        throw err?.details?.[0].message
      }
    }
  }
  getCount = async () => {
    return BookModel.count()
  }
  getAllBook = async (config = { page: 0, perPage: 10 }) => {
    try {
      let skip = config.page * config.perPage
      let data = await BookModel.find()
        .sort({ _id: "desc" })
        .skip(skip)
        .limit(config.perPage)
      return data
    } catch (err) {
      throw err
    }
  }
  getActiveBook = async () => {
    try {
      let data = await BookModel.find({
        status: "active",
      })
        .sort({ _id: "desc" })
        .limit(10)
      return data
    } catch (err) {
      throw err
    }
  }
  storeBook = async data => {
    try {
      let bookObj = await BookModel(data)
      return bookObj.save()
    } catch (err) {
      throw err
    }
  }
  updateBook = async (id, data) => {
    try {
      let response = await BookModel.findByIdAndUpdate(id, {
        $set: data,
      })
      return response
    } catch (err) {
      throw err
    }
  }
  getBookById = async id => {
    try {
      let response = await BookModel.findById(id)
      return response
    } catch (err) {
      throw err
    }
  }
  deleteById = async id => {
    try {
      let response = await BookModel.findByIdAndRemove(id)
      return response
    } catch (err) {
      throw err
    }
  }
}
const bookService = new BookService()
module.exports = bookService
