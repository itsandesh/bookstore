const router = require('express').Router()

const uploader = require("../app/middleware/uploader.middlerware")

const authController = require('../app/Controllers/auth.controllers')

const makeDir = (req, res, next) => {
    req.dirPath = './public/uploads/category';
    next()
}

router.post('/register', makeDir, uploader.single("image"), authController.registerProcess)

router.post('/login', authController.loginProcess);

module.exports = router;