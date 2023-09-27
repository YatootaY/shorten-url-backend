const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Url = require("../models/url")

exports.user_create = asyncHandler( async (req, res, next) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.sendStatus(400)
    }
    const hashPassword = bcrypt.hashSync(req.body.password,8)
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
    });
    const result = await user.save();
    const userData = {
        id: result.id, 
        email: user.email,
        username: user.username
    }
    jwt.sign(userData, process.env.SECRET_KEY, {expiresIn: '30 days'}, (err, token) =>{
        return res.status(201).json({user: userData, auth:token})
    })
})

exports.user_login = asyncHandler( async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400)
    }
    const user = await User.findOne({email: req.body.email})
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const userData = {
            id: user.id, 
            email: user.email,
            username: user.username
        }
        jwt.sign(userData, process.env.SECRET_KEY, {expiresIn: '30 days'}, (err, token) =>{
            return res.status(200).json({user: userData, auth:token})
        })
    }else{
        return res.sendStatus(401)
    }
    
})

exports.user_get = asyncHandler(async(req,res,next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err){
            return res.sendStatus(403)
        }else{
            return res.status(200).json({user: authData})
        }
    })
})

exports.user_links = asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err){
            return res.sendStatus(403)
        }
    })
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const userLinks = await Url.find({userId: req.params.userId})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
    const totalCount = await Url.countDocuments({ userId: req.params.userId });
    if (!userLinks){
        return res.sendStatus(404)
    }else{
        return res.status(200).json({links: userLinks, metadata: {total:totalCount}})
    }
})