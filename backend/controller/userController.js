//@desc     Register a new User 
//@route    POST /api/users
//@access   Public
const registerUser = (req, res, next) => {
    //in order to practice, we need to set body parse/express.josn()
    const { name, email, password } = req.body

    //Validation
    if (!name || !email || !password) {
        //400 is a client error
        //the lient did not include correct inforamtion
        res.status(400)
        throw new Error("Please include all fields")
    }
    res.status(200).json({
        msg: "Register user"
    })
}

//@desc     Login user
//@route    POST /api/users/login
//@acces    Public
const loginUser = (req, res, next) => {
    res.status(200).json({
        msg: "Login user"
    })
}

module.exports = { loginUser, registerUser }