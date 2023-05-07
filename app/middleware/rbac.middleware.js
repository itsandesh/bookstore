const isAdmin = (req, res, next) => {
    if (req.authUser.role.includes("admin")) {
        next()
    } else {
        next({
            status: 403, msg: "You do not have privillage to access"
        })
    }
}
module.exports = {
    isAdmin
}