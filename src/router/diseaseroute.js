const express = require('express')
const diseaseroute = new express.Router()
const diseasedata = require('../Models/diesease')


diseaseroute.get('/disease', async(req, res)=> {
    const diseasecheck = await diseasedata.find()
    console.log(diseasecheck)
    res.status(200).send(diseasecheck)
})


module.exports = diseaseroute;


