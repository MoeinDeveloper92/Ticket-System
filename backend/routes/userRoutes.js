const express = require("express")
const { registerUser, loginUser, getMe } = require("../controller/userController")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
//I have api/users connected to this route 
router.route("/").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me").get(protect, getMe)
module.exports = router