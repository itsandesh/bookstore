const router = require('express').Router()
//user 
router.get('/', (req, res, next) => {
    let users = [{
        id: 1,
        name: "Sandesh Khanal",
        email: "Khanalsandesh234@gmail.com",
        role: 'admin'
    }]
    res.json({
        result: users,
        status: true,
        msg: "user list ",
        meta: {
            totalcount: 1,
            perpage: 10,
            currentpage: 1
        }
    })
})

//insert user data 
router.post('/create', (req, res, next) => {
    try {
        res.json({
            result: null,
            status: true,
            msg: "Here you can create a user",
            meta: null
        })
    }
    catch (error) {
        next(error)
    }
})

//update user
router

router.route("/:id")
    .put((req, res, next) => {
        res.json({
            result: req.params.id,
            status: true,
            msg: "User Id fetched",
            meta: null
        })
    })
    .delete((req, res, next) => {
    })

module.exports = router;