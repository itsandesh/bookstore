const userService = require("../services/user.service");

class AuthController {

    registerProcess = async (req, res, next) => {
        try {
            let payload = req.body;

            //validation
            let validateData = await userService.validateUser(payload);
            res.json({
                result: validateData,
                status: true,
                msg: "Register Process",
                neta: null
            })
        } catch (err) {
            if (err?.details) {
                err = err?.details?.[0].message;
            }
            next({ status: 400, msg: err })
        }
    }

    loginProcess = (req, res, next) => {
        res.json({
            result: null,
            status: true,
            msg: "Login Process",
            neta: null
        })
    }
    changePasswordProcess = (req, res, next) => {

    }
    LoggedInProfile = (req, res, next) => {

    }


}

const authController = new AuthController;

module.exports = authController;