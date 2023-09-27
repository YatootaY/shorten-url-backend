const express = require('express');
const userController= require('../controllers/userController');
const { verifyToken } = require('../util');
const router = express.Router();

router.post('/create', userController.user_create)

router.post('/login', userController.user_login)

router.get('/me', verifyToken, userController.user_get)

router.get("/:userId/links", verifyToken, userController.user_links)

module.exports = router