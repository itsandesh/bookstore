const bannerService = require("../services/banner.service")

class BannerController {

    listAllBanners = async (req, res, next) => {
        try {
            let currentPage = Number(req.query.page) ?? 0;
            let perPage = Number(req.query.perPage) ?? 10;
            let response = await bannerService.getAllBanners({ page: currentPage, perPage: perPage })
            let meta = {
                totalCount: await bannerService.getCount(),
                perPage: perPage,
                currentPage: currentPage
            }
            res.json({
                result: response,
                msgg: "Banner list successfully",
                status: true,
                meta: meta
            })
        } catch (err) {
            next({
                status: 400, msg: "list error", err
            })
        }

    }
    ListForHomepage = async (req, res, next) => {
        try {
          
            let response = await bannerService.getActiveBanners();
            res.json({
                result: response,
                msgg: "Banner list successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({
                status: 400, msg: "list error", err
            })
        }
    }

}

const bannerController = new BannerController()
module.exports = bannerController
