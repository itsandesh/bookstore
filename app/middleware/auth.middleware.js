const jwt = require("jsonwebtoken");
const AppConstants = require("../../config/constants");
const userSvc = require("../services/user.service");

const authCheck = async (req, res, next) => {
  try {
    // token login
    // next()
    let token = null;

    if (req.headers['authorization']) {
      token = req.headers['authorization'];
    } else if (req.headers['x-xsrf-token']) {
      token = req.headers['x-xsrf-token'];
    } else if (req.query['token']) {
      token = req.query['token']
    }

    if (!token) {
      next({ status: 401, msg: "Unauthorized access" })
    }

    // token 
    // token            => ["token"]
    // Bearer token     => ["Bearer", "null"]
    token = (token.split(" ")).pop();   // token
    if (!token || token == 'null') {
      next({ status: 401, msg: "Invalid token" })
    }

    // token valid 
    let data = jwt.verify(token, AppConstants.JWT_SECRET);

    // user id
    let user = await userSvc.getUserById(data.userId)

    if (user) {
      req.authUser = user;
      req.tokenData = data;
      next();
    } else {
      next({ status: 401, msg: "User does not exists.." })
    }
  } catch (excep) {
    if (excep instanceof jwt.JsonWebTokenError) {
      excep = "Invalid Signature"
    }
    next({ status: 401, msg: "Unauthorized: " + excep })
  }

}

module.exports = authCheck