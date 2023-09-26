const express = require("express")
const urlController = require("../controllers/urlController")
const { verifyTonken } = require("../util")
const router = express.Router()

router.post('/create', verifyTonken, urlController.url_create)

module.exports = router