const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const AppConstants = require("../../config/constants");
const nodemailer = require('nodemailer');
const sendEmail = require("../services/mail.service");
const { mongoClient, MongoClient } = require("mongodb")
const dbUrl = "mongodb://127.0.0.1:27017"
class AuthController {

    registerProcess = async (req, res, next) => {

        try {
            let payload = req.body;
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



        } catch (err) {
            next({ status: 400, msg: err })
        }
    }

    loginProcess = async (req, res, next) => {
        let data = req.body;
        // let detail = {
        //     _id: 123,
        //     name: "Sandesh Khanal",
        //     email: "sandesh@gmail.com",
        //     password: "$2b$10$AqhUP0wfXm5sr25wu5O2.Oi1acCnyNttxai0ViI.6QKe.BotTPORO",
        //     role: [
        //         "admin"
        //     ],
        //     status: "active",
        //     address: "kathmandu",
        //     phone: "+977 9874561230",
        //     image: "1683464043751-IMG-4245.JPG"
        // };

        let client = await MongoClient.connect(dbUrl)
        let db = client.db("bookstore")
        let detail = db.collection('users').findOne({ email: data.email })

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