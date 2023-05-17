const bannerService = require("../services/banner.service")

class BannerController {

    listAllBanners = async (req, res, next) => {
        try {
            let currentPage = (req.query.page) ?? 0;
            let perPage = (req.query.perPage) ?? 10;
            let response = await bannerService.getAllBanners({ page: currentPage, perPage: perPage })
            let meta = {
                totalCount: await bannerService.getCount(),
                perPage: Number(perPage),
                currentPage: Number(currentPage)
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
    createBanner = async (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename
            }
            await bannerService.validateRequest(data);
            let response = await bannerService.storeBanner(data);
            res.json({
                result: response,
                msg: "Banner Created Successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            console.log("Banner creation errorr", err);
            next({
                status: 400, msg: "Banner creation errorr", err
            })
        }

    }

}

const bannerController = new BannerController()
module.exports = bannerController
