const router = require("express").Router()
const bookController = require("../app/Controllers/book.controller")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middlerware")

const makeDir = (req, res, next) => {
  req.dirPath = "./public/uploads/book"
  next()
}
//frontend routes should be on top
//web
router.get("/list", bookController.ListForHomepage)
//cms
router
  .route("/")
  .get(authCheck, isAdmin, bookController.listAllBook)

  .post(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    bookController.createBook
  )

router
  .route("/:id")
  .put(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    bookController.updateBook
  )
  .delete(authCheck, isAdmin, bookController.deleteBookById)

module.exports = router
