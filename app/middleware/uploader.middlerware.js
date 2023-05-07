
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

const imageFilter = (req, file, cb) => {
    const listAllowed = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
    let fileExt = file.originalname.split(".").pop()
    if (listAllowed.includes(fileExt.toLowerCase())) {
        cb(null, true);
    } else {
        cb({ status: 400, msg: "File format not supported" })
    }
}
const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 3000000
    }
})

module.exports = uploader;