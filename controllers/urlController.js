const Url = require("../models/url")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { nanoid } = require('nanoid');

exports.url_create = asyncHandler( async(req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err){
            return res.sendStatus(403)
        }
    })
    if (!req.body.originalUrl || !req.body.userId){
        return res.sendStatus(400)
    }
    const url = new Url({
        originalUrl: req.body.originalUrl,
        shortUrl: nanoid(10),
        userId: req.body.userId,
        description: req.body.description ? req.body.description : ""
    })
    const result = await url.save()
    res.status(201).json(result.toJSON())
})