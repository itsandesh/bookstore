const router = require('express').Router()

const multer = require('multer')
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = "./public/uploads"
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let file_name = Date.now() + "-" + file.originalname
        cb(null, file_name)
    }
})
const uploader = multer({
    storage: myStorage
})

const authController = require('../app/Controllers/auth.controllers')

router.post('/register', uploader.single("image"), authController.registerProcess)

router.post('/login', authController.loginProcess);

module.exports = router;