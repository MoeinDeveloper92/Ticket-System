const express = require("express")
const protect = require("../middleware/authMiddleware")
const { getTickets, createTicket } = require("../controller/ticketController")
const router = express.Router()


//in order to get your ticket you must be authenticated
router.route("/").get(protect, getTickets).post(protect, createTicket)


module.exports = router