const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    return res.send("create user")
})

router.get('/me', (req, res) => {
    return res.send("login user")
})

module.exports = router