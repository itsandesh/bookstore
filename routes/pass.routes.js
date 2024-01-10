
const router = require("express").Router()
const authController = require("../app/Controllers/auth.controllers")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")

const uploader = require("../app/middleware/uploader.middlerware")

const makeDir = (req, res, next) => {
    req.dirPath = "./public/uploads/user"
    next()
}

router
    .route("/:id")
    .put(authCheck, isAdmin, makeDir, uploader.single("image"), authController.changePasswordProcess)



module.exports = router
