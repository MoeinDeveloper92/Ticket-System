const mongoose = require("mongoose")


//each ticket should pertain to a ceratin user
const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //which collection we are referring to
        ref: 'User'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //which collection we are referring to
        ref: 'Ticket'
    },
    text: {
        type: String,
        required: [true, "Please add some text"]
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,
    },
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema)

module.exports = Note