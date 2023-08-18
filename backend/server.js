const express = require("express")
const dotenv = require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require("../backend/middleware/errorMiddleware")
const PORT = process.env.PORT || 5000

const app = express()
//add body parser to getting the body of the reques
//express.josn allows us to send raw json
app.use(express.json())
//expres.urlencoded allows us to send form data
app.use(express.urlencoded({ extended: true }))



//Rotues
app.use("/api/users", userRoutes)
app.use(errorHandler)
app.listen(PORT, () => console.log(`The server is running on the port ${PORT}`))
