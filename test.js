const jwt = require("jsonwebtoken");
const AppConstants = require("../../config/constants");

const authCheck = (req, res, next) => {

    let token = null;

    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    } else if (req.headers['x-xsrf-token']) {
        token = req.headers['x-xsrf-token'];
    } else if (req.query['token']) {
        token = req.query['token']
    }

    if (!token) {
        next({ status: 401, 
            msg: "Unauthorized access"
         })
    }

    token = (token.split("")).pop();   // token
    if (!token || token == 'null') {
        next({ status: 401, msg: "Invalid token" })
    }

    // token valid 
    let data = jwt.verify(token, AppConstants.JWT_SECRET);
    console.log(data);

}

module.exports = authCheck