const { default: slugify } = require("slugify")
const { deleteImage } = require("../../config/functions")
const CategoryModel = require("../model/category.model")
const categoryService = require("../services/category.service")

class CategoryController {
  listAllCategory = async (req, res, next) => {
    try {
      let currentPage = req.query.page ?? 0
      let perPage = req.query.perPage ?? 10
      let response = await categoryService.getAllCategory({
        page: currentPage,
        perPage: perPage,
      })
      let meta = {
        totalCount: await categoryService.getCount(),
        perPage: Number(perPage),
        currentPage: Number(currentPage),
      }
      res.json({
        result: response,
        msgg: "Category list successfully",
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
      let response = await categoryService.getActiveCategory()
      res.json({
        result: response,
        msgg: "Category list successfully",
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
  createCategory = async (req, res, next) => {
    try {
      let data = req.body
      if (req.file) {
        data.image = req.file.filename
      }
      await categoryService.validateRequest(data)

      data.parent = data.parent !== null && data.parent !== "" ? data.parent : null;

      data.slug = slugify(data.title, {
        replacement: "-",
        lower: true,
        trim: true,
      })

      data.createdBy = req.authUser._id;

      let response = await categoryService.storeCategory(data)

      res.json({
        result: response,
        msg: "Category Created Successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log("Category creation errorr", err)
      next({
        status: 400,
        msg: "Category creation errorr" + err,
      })
    }
  }
  updateCategory = async (req, res, next) => {
    try {
      let data = req.body
      let categoryData = await categoryService.getCategoryById(req.params.id)
      if (req.file) {
        data.image = req.file.filename
      } else {
        data.image = categoryData.image
      }
      data.parent = data.parent !== null && data.parent !== "" ? data.parent : null;

      await categoryService.validateRequest(data)
      data.slug = slugify(data.title, {
        replacement: "-",
        lower: true,
        trim: true,
      })
      let response = await categoryService.updateCategory(req.params.id, data)
      res.json({
        result: response,
        msg: "Category Updated Successfully",
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
      console.log("Category Update errorr", err)
      next({
        status: 400,
        msg: "Category Update errorr" + err,
      })
    }
  }
  deleteCategoryById = async (req, res, next) => {
    try {
      let response = await categoryService.deleteById(req.params.id)
      if (response) {
        if (response.image) {
          console.log(response.image)
          deleteImage(
            process.cwd() + "/public/uploads/category/",
            response.image
          )
        }
        res.json({
          result: response,
          msg: "Category Deleted Successfully",
          status: true,
          meta: null,
        })
      } else {
        throw "Category already deleted or does not exist anymore..."
      }
    } catch (err) {
      console.log("Category Deletion errorr", err)
      next({
        status: 400,
        msg: "Category Deletion errorr " + err,
      })
    }
  }
  getCategoryById = async (req, res, next) => {
    try {
      let response = await categoryService.getCategoryById(req.params.id)
      res.json({
        result: response,
        msg: "Book Category detail",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log(err)
      next({
        status: 400,
        msg: "BookCatGetErr" + err,
      })
    }
  }
}

const categoryController = new CategoryController()
module.exports = categoryController
