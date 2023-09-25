const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();

router.post('/', userController.user_create)

router.get('/me', (req, res) => {
    return res.send("login user")
})

module.exports = router