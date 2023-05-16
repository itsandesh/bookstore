const jwt = require("jsonwebtoken");
const AppConstants = require("../../config/constants");
const nodemailer = require('nodemailer');
const userService = require("../services/user.service");

const authCheck = async (req, res, next) => {
    try {
        let token = null;
        if (req.headers['authorization']) {
            token = req.headers['authorization'];
        } else if (req.headers['x-xsrf-token']) {
            token = req.headers['x-xsrf-token'];
        } else if (req.query['token']) {
            token = req.query['token'];
        }

        if (!token) {
            next({
                status: 401,
                msg: 'Unauthorized to access'
            })
        }

        token = (token.split(" ")).pop();
        if (!token || token == 'null') {
            next({
                status: 401,
                msg: 'invalid token'
            })
        }

        let data = jwt.verify(token, AppConstants.JWT_SECRET)


        let user = await userService.getUserById(data.userId)
        delete user.password;

        if (user) {
            req.authUser = user;
            next();

        } else {
            next({ status: 401, msg: "User Does not exists" })
        }

    } catch (excep) {
        console.log("Auth exception" + excep);
        if (excep instanceof jwt.JsonWebTokenError) {
            excep = "Invalid Signature"
        }
        next({ status: 401, msg: "Unauthorized:" + excep })
    }

}

module.exports = authCheck