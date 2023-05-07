const categoryController = require('../app/Controllers/category.controllers')
const router = require("express").Router()
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")

// router.post("/", authCheck, categoryController.createCategory);
router.route("/")
    .get(categoryController.listCategories)
    .post(authCheck, isAdmin, categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategoryDetail)
    .put(categoryController.upadteCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;