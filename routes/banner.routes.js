const router = require("express").Router()
const bannerController = require("../app/Controllers/banner.controller")
const authCheck = require("../app/middleware/auth.middleware")
const { isAdmin } = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/uploader.middlerware")

const makeDir = (req, res, next) => {
  req.dirPath = "./public/uploads/banner"
  next()
}
//frontend routes should be on top
//web
router.get("/list", bannerController.ListForHomepage)
//cms
router
  .route("/")
  .get(authCheck, isAdmin, bannerController.listAllBanners)
  .post(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    bannerController.createBanner
  )

router
  .route("/:id")
  .put(
    authCheck,
    isAdmin,
    makeDir,
    uploader.single("image"),
    bannerController.updateBanner
  )
  .delete(authCheck, isAdmin, bannerController.deleteBannerById)

module.exports = router
