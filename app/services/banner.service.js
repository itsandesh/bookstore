const BannerModel = require("../model/banner.model");

class BannerService {
    getCount = async () => {
        return BannerModel.count();

    }
    getAllBanners = async (config = { page: 0, perPage: 10 }) => {
        try {
            let skip = config.page * config.perPage;
            let data = await BannerModel.find() .sort({_id:"desc"}).skip(skip).limit(config.perPage);
            return data;
        } catch (err) {
            throw err
        }
    }
    getActiveBanners = async()=>{
        try{
            let data = await BannerModel.find({
                status:active
            })
            .sort({_id:"desc"})
            .limit(10)
            return data 
        }catch(err){
            throw err
        }
    }

}
const bannerService = new BannerService();
module.exports = bannerService; 