const { deleteImage } = require("../../config/functions")
const BannerModel = require("../model/banner.model")
const bannerService = require("../services/banner.service")

class BannerController {
  listAllBanners = async (req, res, next) => {
    try {
      let currentPage = req.query.page ?? 0
      let perPage = req.query.perPage ?? 10
      let response = await bannerService.getAllBanners({
        page: currentPage,
        perPage: perPage,
      })
      let meta = {
        totalCount: await bannerService.getCount(),
        perPage: Number(perPage),
        currentPage: Number(currentPage),
      }
      console.log("Total Count:", await bannerService.getCount());
      res.json({
        result: response,
        msg: "Banner list successfully",
        status: true,
        meta: meta,
      })
    } catch (err) {
      next({
        status: 400,
        msg: "list error" + err,
      })
    }
  }
  ListForHomepage = async (req, res, next) => {
    try {
      let response = await bannerService.getActiveBanners()
      res.json({
        result: response,
        msgg: "Banner list successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      next({
        status: 400,
        msg: "list error" + err,
      })
    }
  }
  createBanner = async (req, res, next) => {
    try {
      let data = req.body
      if (req.file) {
        data.image = req.file.filename
      }
      await bannerService.validateRequest(data)
      let response = await bannerService.storeBanner(data)
      res.json({
        result: response,
        msg: "Banner Created Successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log("Banner creation errorr", err)
      next({
        status: 400,
        msg: "Banner creation errorr" + err,
      })
    }
  }
  updateBanner = async (req, res, next) => {
    try {
      let data = req.body
      let bannerData = await bannerService.getBannerById(req.params.id)
      if (req.file) {
        data.image = req.file.filename
      } else {
        data.image = bannerData.image
      }
      await bannerService.validateRequest(data)
      let response = await bannerService.updateBanner(req.params.id, data)
      res.json({
        result: response,
        msg: "Banner Updated Successfully",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log("Banner Update errorr", err)
      next({
        status: 400,
        msg: "Banner Update errorr" + err,
      })
    }
  }
  deleteBannerById = async (req, res, next) => {
    try {
      let response = await bannerService.deleteById(req.params.id)
      if (response) {
        if (response.image) {
          console.log(response.image)
          deleteImage(process.cwd() + "/public/uploads/banner/", response.image)
        }
        console.log(response)
        res.json({
          result: response,
          msg: "Banner Deleted Successfully",
          status: true,
          meta: null,
        })
      } else {
        throw "Banner already deleted or does not exist anymore..."
      }
    } catch (err) {
      console.log("Banner Deletion errorr", err)
      next({
        status: 400,
        msg: "Banner Deletion errorr " + err,
      })
    }
  }
  getBannerById = async (req, res, next) => {
    try {
      let response = await bannerService.getBannerById(req.params.id)
      res.json({
        result: response,
        msg: "Banner detail",
        status: true,
        meta: null,
      })
    } catch (err) {
      console.log(err)
      next({
        status: 400,
        msg: "BannerGetErr" + err,
      })
    }
  }
}


const bannerController = new BannerController()
module.exports = bannerController
