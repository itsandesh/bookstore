const jwt = require("jsonwebtoken");
const AppConstants = require("../../config/constants");
const nodemailer = require('nodemailer')

const authCheck = (req, res, next) => {
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


        let user = {
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
        }

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