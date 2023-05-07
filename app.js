const express = require("express");
const app = express();

const routes = require("./routes")
const logger = require("./app/middleware/logger.middleware");
const e = require("express");
const { MulterError } = require("multer");

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))


app.use("/api/v1", logger, routes)

app.use((req, res, next) => {
    next({ status: 404, msg: 'Resourse Not FOund' });
})

//error handling middleware
app.use((error, req, res, next) => {
    //multer eror handling
    let status = error.status || 400;
    let msg = error.msg

    if (error instanceof MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            msg = "File should be sess than 3 MB "

        }
        console.log("here");
    }
    res.status(status).json({
        result: null,
        msg: msg,
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