const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")


//@desc     Get user tickets
//@route   GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res, next) => {
    //Get user usign the id and the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }
    //get all the user's ticket
    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

//@desc     Create new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res, next) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error("Please add a product and description ")
    }

    //get user by the Id
    const user = await User.findById(req.user.id)
    if (!user) {
        //401 is viewd as UnAuthorized
        res.status(401)
        throw new Error("User not Found")
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})


//@desc     Get user Ticket
//@route    GET /api/tickets/:id
//@access   Private

const getTicket = asyncHandler(async (req, res, next) => {
    //Get user usnign the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        //UnAuthorized user
        res.status(401)
        throw new Error("User not found")
    }

    //get  single tikcet
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)
})


//@desc     Delete Ticket
//@route    delete /api/tickets/:id
//@access   Ptrivate
const deleteTicket = asyncHandler(async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket Not Found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    const response = await Ticket.findByIdAndRemove(req.params.id)
    if (response) {
        res.status(200).json({
            message: "Ticket has been deleted"
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong!!!")
    }
})


//@desc     Update Ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedTicket)
})

module.exports = { getTickets, createTicket, getTicket, deleteTicket, updateTicket }