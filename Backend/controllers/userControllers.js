const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const generatToken = require("../config/generatToken")


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("please enter all Feilds")
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already Exists")
    }
    const user = await User.create({
        name, email, password, pic,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generatToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Failed to create new user")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generatToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error("Failed to Login")
    }

})
module.exports = { registerUser, authUser } 