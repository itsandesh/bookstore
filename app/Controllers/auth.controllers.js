const userService = require("../services/user.service");

class AuthController {

    registerProcess = async (req, res, next) => {
        try {
            let payload = req.body;

            //validation
            let validateData = await userService.validateUser(payload);
            res.json({
                result: payload,
                status: true,
                msg: "Register Process",
                neta: null
            })
        } catch (err) {
            console.log(err);
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