const express = require("express")
const app = express()
const fs = require("fs")
const mongoose = require("mongoose")
const functions = require("firebase-functions")
const port = 3000
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

const lessonrouter = require("./routes/lessonManager.js")
app.use("/lessons", lessonrouter)

app.get("/", function(req, res) {
    res.redirect('/lessons')
})

app.listen(port)
console.log(`App started! Listening on port ${port}`)

exports.api = functions.https.onRequest(app)