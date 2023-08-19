const mongoose = require("mongoose")


//each ticket should pertain to a ceratin user
const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //which collection we are referring to
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["Iphone", "Macbook", "iMac", "Ipad"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the issue"]
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new"
    }
}, {
    timestamps: true
})

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket