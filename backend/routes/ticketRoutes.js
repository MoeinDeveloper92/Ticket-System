const express = require("express")
const protect = require("../middleware/authMiddleware")
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require("../controller/ticketController")
const router = express.Router()

//Re-write into note router
const noteRouter = require("../routes/noteRoutes")
router.use("/:ticketId/notes", noteRouter)

//in order to get your ticket you must be authenticated
router.route("/").get(protect, getTickets).post(protect, createTicket)
router.route("/:id").get(protect, getTicket)
router.route("/:id").delete(protect, deleteTicket)
router.route("/:id").put(protect, updateTicket)
module.exports = router