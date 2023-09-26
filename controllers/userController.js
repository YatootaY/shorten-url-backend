const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.verifyTonken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403);
    }
}

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
            res.sendStatus(403)
        }else{
            return res.status(200).json({message: "You got it", authData})
        }
    })
})