const errorHandler = (err, req, res, next) => {
    //set status code
    const statusCode = res.statusCode ? res.statusCode : 500
    const message = err.message
    res.status(statusCode).json({
        message,
        // we can send stack trace

        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}


module.exports = { errorHandler }