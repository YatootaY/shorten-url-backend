const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();

router.post('/', userController.user_create)

router.get('/me', userController.verifyTonken, userController.user_get)

module.exports = router