const express = require('express')
const router = express.Router()

const auth_routes = require('./auth.routes')
const user_routes = require('./user.routes')

router.use(auth_routes);
router.use("/user",user_routes);

module.exports = router;