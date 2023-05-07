const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
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