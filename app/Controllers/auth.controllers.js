const userService = require("../services/user.service");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        let detail = {
            _id: 123,
            name: "Sandesh Khanal",
            email: "sandesh@gmail.com",
            password: "$2b$10$ihtaEw1zOIZFZ1UD4DtueOLu4tq8bjefEy3JV59p6yYoGAX0aJlxu",
            role: [
                "admin"
            ],
            status: "active",
            address: "kathmandu",
            phone: "+977 9874561230",
            image: "1683464043751-IMG-4245.JPG"
        };
        let token = jwt.sign({ userId: detail._id }, "sandesh123");
        res.json({
            result: {
                detail: detail,
                token: token

            },
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