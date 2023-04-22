const express = require("express");
const app = express();

const routes = require("./routes")
const logger = require("./app/middleware/logger.middleware");

app.use("/api/v1", logger, routes)



app.use((req, res, next) => {
    next({ status: 404, msg: 'Resourse Not FOund' });
})

//error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status).json({
        result: null,
        msg: error.msg ,
        status: false,
        meta: null
    })
})


app.listen(3005, 'localhost', (err) => {
    if (err) {
        console.log("Error Listening to the server port 3005")
    } else {
        console.log("Server is running in port 3005")
        console.log("Press CTRL+C to dissconnect Server...")
    }
})