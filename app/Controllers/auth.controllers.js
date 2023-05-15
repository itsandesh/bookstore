const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const AppConstants = require("../../config/constants");
const nodemailer = require('nodemailer');
const sendEmail = require("../services/mail.service");

class AuthController {

    registerProcess = async (req, res, next) => {

        try {
            let payload = req.body;

            let exists = await userService.getUserByEmail(payload.email)
            if (exists) {
                throw "User already registered"
            } else {
                if (req.file) {
                    payload.image = req.file.filename;
                }
                //validation
                let validatedData = await userService.validateUser(payload);

                validatedData.password = await bcrypt.hash(validatedData.password, 10);

                console.log("I an here");

                //store data 

                let response = await userService.registerUser(validatedData)

                sendEmail({
                    from: "noreply@test.com",
                    to: payload.email,
                    subject: "Account Registered!",
                    textMessage: "Dear user your accound has been registered",
                    htmlMessage: `<p><strong>Congratulations your account has been registered</strong></p>`,
                })
                res.json({
                    result: response,
                    status: true,
                    msg: "Your account has been registered",
                    neta: null
                })
            }
        } catch (err) {
            next({ status: 400, msg: err })
        }
    }

    loginProcess = async (req, res, next) => {
        try {
            let data = req.body;
            let detail = await userService.getUserByEmail(data.email)
            console.log(detail);

            if (detail) {
                if (bcrypt.compareSync(data.password, detail.password)) {
                    let token = jwt.sign({ userId: detail._id }, AppConstants.JWT_SECRET);
                    await sendEmail({
                        from: "noreply@test.com",
                        to: detail.email,
                        subject: "OTP CODE",
                        textMessage: "Your OTP code is 1234",
                        htmlMessage: `<p><strong>OTP CODE IS 1234</strong></p>`,
                    })
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

                    throw "Password does not match "

                }
            } else {
                throw "Incorrect Username"
            }

        } catch (err) {
            next({
                status: 400, msg: err
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