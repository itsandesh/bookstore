const { default: slugify } = require("slugify")
const { deleteImage } = require("../../config/functions")
const BookModel = require("../model/book.model")
const bookService = require("../services/book.service")

class BookController {
  listAllBook = async (req, res, next) => {
    try {
      let currentPage = req.query.page ?? 0
      let perPage = req.query.perPage ?? 10
      let response = await bookService.getAllBook({
        page: currentPage,
        perPage: perPage,
      })
      let meta = {
        totalCount: await bookService.getCount(),
        perPage: Number(perPage),
        currentPage: Number(currentPage),
      }
      res.json({
        result: response,
        msgg: "Book list successfully",
        status: true,
        meta: meta,
      })
    } catch (err) {
      next({
        status: 400,
        msg: "list error" + err,
      })
    }
  }

  ListForHomepage = async (req, res, next) => {
    try {
      let response = await bookService.getActiveBook()
      res.json({
        result: response,
        msgg: "Book list successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      next({
        status: 400,
        msg: "list error" + err,
      })
    }
  }
  createBook = async (req, res, next) => {
    try {
      let data = req.body
      if (req.file) {
        data.image = req.file.filename
      }
      await bookService.validateRequest(data)

      data.slug = slugify(data.title, {
        replacement: "-",
        lower: true,
        trim: true,
      })

      let response = await bookService.storeBook(data)

      res.json({
        result: response,
        msg: "Book Created Successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log("Book creation errorr", err)
      next({
        status: 400,
        msg: "Book creation errorr" + err,
      })
    }
  }
  updateBook = async (req, res, next) => {
    try {
      let data = req.body
      let bookData = await bookService.getBookById(req.params.id)
      if (req.file) {
        data.image = req.file.filename
      } else {
        data.image = bookData.image
      }
      await bookService.validateRequest(data)
      data.slug = slugify(data.title, {
        replacement: "-",
        lower: true,
        trim: true,
      })
      let response = await bookService.updateBook(req.params.id, data)
      res.json({
        result: response,
        msg: "Book Updated Successfully",
        status: true,
        _meta: null,
        get meta() {
          return this._meta
        },
        set meta(value) {
          this._meta = value
        },
      })
    } catch (err) {
      console.log("Book Update errorr", err)
      next({
        status: 400,
        msg: "Book Update errorr" + err,
      })
    }
  }
  deleteBookById = async (req, res, next) => {
    try {
      let response = await bookService.deleteById(req.params.id)
      if (response) {
        if (response.image) {
          console.log(response.image)
          deleteImage(
            process.cwd() + "/public/uploads/book/",
            response.image
          )
        }
        console.log(response)
        res.json({
          result: response,
          msg: "Book Deleted Successfully",
          status: true,
          meta: null,
        })
      } else {
        throw "Book already deleted or does not exist anymore..."
      }
    } catch (err) {
      console.log("Book Deletion errorr", err)
      next({
        status: 400,
        msg: "Book Deletion errorr " + err,
      })
    }
  }
  getBookById = async (req, res, next) => {
    try {
      let response = await bookService.getBookById(req.params.id)
      console.log("Reeesponse",response)
      
      res.json({
        result: response,
        msg: "Book detail",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log(err)
      next({
        status: 400,
        msg: "BookGetErr" + err,
      })
    }
  }
}

const bookController = new BookController()
module.exports = bookController
