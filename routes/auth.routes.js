const router = require('express').Router()

const authController = require('../app/Controllers/auth.controllers')

router.post('/register', authController.registerProcess)

router.post('/login', authController.loginProcess);

module.exports = router;