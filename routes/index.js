const router = require("express").Router()

const auth_routes = require("./auth.routes")
const user_routes = require("./user.routes")
const category_routes = require("./category.routes")
const banner_routes = require("./banner.routes")

router.use(auth_routes)
router.use("/user", user_routes)
router.use("/category", category_routes)
router.use("/banner", banner_routes)

module.exports = router
