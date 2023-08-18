const express = require("express")
const { registerUser, loginUser } = require("../controller/userController")
const router = express.Router()

//I have api/users connected to this route 
router.route("/").post(registerUser)
router.route("/login").post(loginUser)
module.exports = router