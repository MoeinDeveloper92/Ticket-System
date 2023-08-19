const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")


//@desc     Get user tickets
//@route   GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "GetTickets"
    })
})

//@desc     Create new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res, next) => {
    res.status(201).json({
        message: "Create Ticket"
    })
})




module.exports = { getTickets, createTicket }