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

exports.url_get = asyncHandler( async(req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err){
            return res.sendStatus(403)
        }
    })
    if (!req.params.shortUrl){
        return res.sendStatus(400)
    }
    const url = await Url.findOne({shortUrl: req.params.shortUrl})
    if (!url){
        return res.sendStatus(404)
    }
    url.clicks.count += 1
    const result = await url.save()
    return res.status(200).json(result.toJSON())
})