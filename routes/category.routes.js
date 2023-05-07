const categoryController = require('../app/Controllers/category.controllers')
const router = require("express").Router()

const authCheck = (req, res, next) => {
    console.log("makadocs");
    res.json({
        result: req.headers,
        status: true,
        msg: "I am a Auth Check middleware",
        meta: null

    })
}
// router.post("/", authCheck, categoryController.createCategory);

router.route("/")
    .get(categoryController.listCategories)
    .post(authCheck, categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategoryDetail)
    .put(categoryController.upadteCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;