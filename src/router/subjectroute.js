const express = require('express')
const subjectroute = new express.Router()
const subjectdata = require("../Models/subject")

subjectroute.get("/subjectroute", async (req, res)=> {
    try {
        const subjectData = await subjectdata.find()
        res.status(200).send(subjectData)
    } catch (error) {
        console.log(error?.message)
    }
})


module.exports = subjectroute;