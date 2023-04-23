const router = require("express").Router()

const categoryController = require('../app/Controllers/category.controllers')
router.route("/")
    .get(categoryController.listCategories)
    .post(categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategoryDetail)
    .put(categoryController.upadteCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;