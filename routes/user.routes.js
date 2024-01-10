
const router = require("express").Router()
const authController = require("../app/Controllers/auth.controllers")
// const userController = require("../app/Controllers/user.controllers")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middlerware")

const makeDir = (req, res, next) => {
  req.dirPath = "./public/uploads/user"
  next()
}
//frontend routes should be on top
//web
// router.get("/list", userController.ListForHomepage)
//cms
// router
//   .route("/")
//   .get(authCheck, isAdmin, userController.listAllUser)
//   .post(authCheck, isAdmin, makeDir, uploader.single("image"), userController.createUser
//   )

router
  .route("/:id")
  .put(authCheck, isAdmin, makeDir, uploader.single("image"), authController.updateProfile)
  // .put(authCheck, isAdmin,  authController.changePasswordProcess)
// .get(authCheck, isAdmin, userController.getUserById)
// .delete(authCheck, isAdmin, userController.deleteUserById)

module.exports = router
