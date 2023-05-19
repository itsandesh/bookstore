const router = require("express").Router()
const uploader = require("../app/middleware/uploader.middlerware")
const authController = require("../app/Controllers/auth.controllers")
const authCheck = require("../app/middleware/auth.middleware")

const makeDir = (req, res, next) => {
  req.dirPath = "./public/uploads/user"
  next()
}

router.post(
  "/register",
  makeDir,
  uploader.single("image"),
  authController.registerProcess
)

router.post("/login", authController.loginProcess)

router.get("/my-profile", authCheck, authController.LoggedInProfile)

router.put("/change-password", authCheck, authController.changePasswordProcess)

module.exports = router
