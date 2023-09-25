require('dotenv').config();
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.user_create = asyncHandler( async (req, res, next) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = bcrypt.hashSync(req.body.password,8)
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword
    });
    const result = await user.save();
    jwt.sign({user: user}, process.env.SECRET_KEY, (err, token) =>{
        return res.status(201).json({ message: "User created successfully", user: result, auth: {token} });
    })
})

