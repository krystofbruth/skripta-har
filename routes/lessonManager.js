const express = require("express")
const mongoose = require("mongoose")
const dbURI = "mongodb://localhost:27017/skripta-har"
const Schema = mongoose.Schema
const router = express.Router()
const fs = require("fs")
mongoose.connect(dbURI)
.then(function(result) {
    console.log(`Successfully connected to db ${dbURI}`)
})
.catch(function(err){console.log(err)})

const LessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})
const Lesson = mongoose.model('lesson', LessonSchema)

router.post('/add-lesson', function (req, res) {
    const lesson = new Lesson({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })
    lesson.save()
        .then(function(result) {console.log(`Successfully created new lesson: ${result}`)})
        .catch(function(err) {console.log(err)})
    res.status(201).send('201: Success')
})
router.get('/', function(req, res) {
    Lesson.find()
        .then(function(result) {res.render('index.ejs', {lessons: result})})
        .catch(function(err) {console.log(err)})
})
router.get('/:lessonid', function(req, res) {
    Lesson.findById(req.params.lessonid)
        .then(function(result){res.render('lesson.ejs', { lesson: result})})
        .catch(function(err) {console.log(err)})
})

module.exports = router