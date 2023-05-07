const router = require('express').Router()

const uploader = require("../app/middleware/uploader.middlerware")

const authController = require('../app/Controllers/auth.controllers')

router.post('/register', uploader.single("image"), authController.registerProcess)

router.post('/login', authController.loginProcess);

module.exports = router;