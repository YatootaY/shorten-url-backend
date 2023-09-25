const User = require("../models/user")
const uuid = require("uuid")
const asyncHandler = require("express-async-handler")

exports.user_create = asyncHandler( async (req, res, next) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const id = uuid.v4()
    const user = new User({
        id,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    const result = await user.save();
    return res.status(201).json({ message: "User created successfully", user: result });
})

