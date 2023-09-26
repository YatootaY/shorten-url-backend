const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();

router.post('/create', userController.user_create)

router.post('/login', userController.user_login)

router.get('/me', userController.verifyTonken, userController.user_get)

module.exports = router