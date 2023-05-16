const router = require("express").Router()
const bannerController = require("../app/Controllers/banner.controller")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")


//frontend routes should be on top 
//web 
router.get("/list", bannerController.ListForHomepage)
//cms
router.route("/").get(authCheck, isAdmin, bannerController.listAllBanners)


module.exports = router;