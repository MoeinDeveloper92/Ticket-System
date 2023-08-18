const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")


//@desc     Register a new User 
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    //in order to practice, we need to set body parse/express.josn()
    const { name, email, password } = req.body

    //Validation
    if (!name || !email || !password) {
        //400 is a client error
        //the lient did not include correct inforamtion
        res.status(400)
        throw new Error("Please include all fields")
    }
    //check if the user exist
    //we dont want toregister if the user already exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        //bad request and client error
        res.status(400)
        throw new Error("User Already Exist")
    }

    //create user and hash the password inside the user model
    const user = await User.create({
        //we hash the passwor in the userSchema
        name, email, password
    })

    if (user) {
        //generate token
        //201 ecerything is good and the user gets created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data.")
    }
})






//@desc     Login user
//@route    POST /api/users/login
//@acces    Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all the field")
    }

    //check for the user if it does not exist
    const userExist = await User.findOne({ email })
    if (!userExist) {
        res.status(400)
        throw new Error("User Does not exist, Please register first.")
    }

    //we need to check for the password
    //bear in mind that, you shuld put first plain text password
    if (userExist && (await userExist.matchPasswords(password))) {
        res.status(200).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: generateToken(userExist._id)
        })
    } else {
        //user has not benn autjorized
        res.status(401)
        throw new Error("Invalid user or password!!")
    }

})


//@desc     dipslay user's infoamtion
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res, next) => {
    //if the users get the permission, which means we can get the req.user
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

module.exports = { loginUser, registerUser, getMe }