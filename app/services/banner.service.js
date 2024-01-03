const BannerModel = require("../model/banner.model")
const Joi = require("joi")

class BannerService {
  validateRequest = data => {
    try {
      let bannerSchema = Joi.object({
        title: Joi.string().required(),

        link: Joi.string().empty(),

        status: Joi.string().allow("active", "inactive").default("inactive"),

        image: Joi.string().empty(),
      })
      let validate = bannerSchema.validateAsync(data)
      return validate
    } catch (err) {
      if (err?.details) {
        throw err?.details?.[0].message
      }
    }
  }
  getCount = async () => {
    return BannerModel.count()
  }
  getAllBanners = async (config = { page: 0, perPage: 10 }) => {
    try {
      let skip = config.page * config.perPage
      let data = await BannerModel.find()
        .sort({ _id: "desc" })
        .skip(skip)
        .limit(config.perPage)
      return data
    } catch (err) {
      throw err
    }
  }
  getActiveBanners = async () => {
    try {
      let data = await BannerModel.find({
        status: "active",
      })
        .sort({ _id: "desc" })
        .limit(10)
      return data
    } catch (err) {
      throw err
    }
  }
  storeBanner = async data => {
    try {
      let bannerObj = await BannerModel(data)
      return bannerObj.save()
    } catch (err) {
      throw err
    }
  }
  updateBanner = async (id, data) => {
    console.log('Banner ID AND DATA ', id, data);

    try {
      let response = await BannerModel.findByIdAndUpdate(id, {
        $set: data,
      })
      return response
    } catch (err) {
      throw err
    }
  }
  getBannerById = async id => {
    try {
      let response = await BannerModel.findById(id)
      return response
    } catch (err) {
      throw err
    }
  }
  deleteById = async id => {
    try {
      let response = await BannerModel.findByIdAndRemove(id)
      return response
    } catch (err) {
      throw err
    }
  }
}
const bannerService = new BannerService()
module.exports = bannerService
