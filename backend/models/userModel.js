const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name field"]
    },
    email: {
        type: String,
        required: [true, "Please add an emial field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password field"]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

//we hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


userSchema.methods.matchPasswords = async function (enteredPassword) {
    //this.password is the password in the documetn
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)


module.exports = User