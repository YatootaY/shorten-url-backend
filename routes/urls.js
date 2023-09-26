const express = require("express")
const urlController = require("../controllers/urlController")
const { verifyToken } = require("../util")
const router = express.Router()

router.post('/create', verifyToken, urlController.url_create)

router.get("/:shortUrl", verifyToken, urlController.url_fetch)

module.exports = router