const express = require('express')
const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    name: {type: String},
    type: {type: String}
})

const subjectdata = new mongoose.model('subjects',subjectSchema)
module.exports = subjectdata