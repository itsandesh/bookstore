class AuthController {

    registerProcess = (req, res, next) => {
        res.json({
            result: null,
            status: true,
            msg: "Register Process",
            neta: null
        })
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