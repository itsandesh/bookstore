const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const AppConstants = require("../../config/constants");
const nodemailer = require('nodemailer');
const sendEmail = require("../services/mail.service");
const { equal } = require("joi");

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
    changePasswordProcess = async (req, res, next) => {
        try {
            let payload = req.body;
            let loggedInUser = req.authUser;
            let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            let toBeChanged = await userService.getUserByEmail(payload.email)
            if (!toBeChanged) {
                throw "User Does Not exist "
            } else if (!toBeChanged._id.equals(loggedInUser._id)) {
                next({
                    status: 403,
                    msg: " you do not have previllage to change the password "
                })
            } else if (!pattern.test(payload.password)) {
                throw "Password must be of 8 characters with at least a Captial letter, a Number , a small letter"
            } else if (payload.password !== payload.confirmPassword) {
                throw "Password and confirm password does not match "
            } else {
                let encPassword = bcrypt.hashSync(payload.password, 10)
                let response = await userService.updateUserById(loggedInUser._id, { password: encPassword })
                res.json({
                    result:null,
                    msg:"your password has been changed succesfully",
                    status:true,
                    meta:null


                })

            }

        } catch (err) {
            next({
                status: 400, msg: err
            })

        }
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