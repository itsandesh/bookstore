const router = require('express').Router()

// const { addListener } = require('nodemon');
const userController = require('../app/Controllers/user.controllers')

router.route("/")
.get(userController.listUsers)
.post(userController.createUser)

router.route("/:id")
    .get(userController.getUserDetail)
    .put(userController.upadteUser)
    .delete(userController.deleteUser)

// router.delete('/:id', userController.deleteUser);

module.exports = router;