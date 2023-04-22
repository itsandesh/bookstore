const router = require('express').Router()

router.post('/register', (req, res, next) => {
    res.json({
        result: null,
        status: true,
        msg: "Here you can register a user",
        meta: null
    })
})

router.post('/login', (req, res, next) => {
    res.json({
        result: {
            detail: {},
            token: null
        },
        status: true,
        msg: "Here you can login a user",
        meta: null
    })
})

module.exports = router;