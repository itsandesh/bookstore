const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const AppConstants = require("../../config/constants");

class AuthController {

    registerProcess = async (req, res, next) => {
        try {

            let payload = req.body;

            if (req.file) {
                payload.image = req.file.filename;
            }
            //validation
            let validateData = await userService.validateUser(payload);

            validateData.password = await bcrypt.hash(validateData.password, 10);
            res.json({
                result: validateData,
                status: true,
                msg: "Register Process",
                neta: null
            })
        } catch (err) {
            next({ status: 400, msg: err })
        }
    }

    loginProcess = (req, res, next) => {
        let data = req.body;
        let detail = {
            _id: 123,
            name: "Sandesh Khanal",
            email: "sandesh@gmail.com",
            password: "$2b$10$AqhUP0wfXm5sr25wu5O2.Oi1acCnyNttxai0ViI.6QKe.BotTPORO",
            role: [
                "admin"
            ],
            status: "active",
            address: "kathmandu",
            phone: "+977 9874561230",
            image: "1683464043751-IMG-4245.JPG"
        };
        if (bcrypt.compareSync(data.password, detail.password)) {
            let token = jwt.sign({ userId: detail._id }, AppConstants.JWT_SECRET);
            res.json({
                result: {
                    detail: detail,
                    token: token

                },
                status: true,
                msg: "Login Process",
                neta: null
            })
        } else {
            next({
                status: 400, msg: "Password does not match "
            })
        }
    }
    changePasswordProcess = (req, res, next) => {

    }
    LoggedInProfile = (req, res, next) => {

        res.json({
            result: req.authUser,
            status: true,
            msg: "Your profile data ",
            meta: null
        })

    }
}

const authController = new AuthController;

module.exports = authController;