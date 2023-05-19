const router = require("express").Router()
const categoryController = require("../app/Controllers/category.controller")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middlerware")

const makeDir = (req, res, next) => {
  req.dirPath = "./public/uploads/category"
  next()
}
//frontend routes should be on top
//web
router.get("/list", categoryController.ListForHomepage)
//cms
router
  .route("/")
  .get(authCheck, isAdmin, categoryController.listAllCategory)

  .post(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    categoryController.createCategory
  )

router
  .route("/:id")
  .put(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    categoryController.updateCategory
  )
  .delete(authCheck, isAdmin, categoryController.deleteCategoryById)

module.exports = router
