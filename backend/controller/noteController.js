const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")
const Note = require("../models/noteModel")

//@desc     Get Notes for a Ticket
//@route    GET /api/tickets/:ticketId/notes
//@access   Private
const getNotes = asyncHandler(async (req, res, next) => {
    //Get user usign the id and the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }
    //get all the user's ticket
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User Not Authorized")
    }

    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})

//@desc     Create Ticket note Ticket
//@route    POST /api/tickets/:ticketId/notes
//@access   Private
const addNote = asyncHandler(async (req, res, next) => {
    //Get user usign the id and the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }
    //get all the user's ticket
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User Not Authorized")
    }

    const note = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text
        ,
        isStaff: false,
        user: req.user.id
    })
    res.status(200).json(note)
})


module.exports = { getNotes, addNote }