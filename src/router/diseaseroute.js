const express = require('express')
const diseaseroute = new express.Router()
const diseasedata = require('../Models/diesease')
const loginuserdata = require('../Models/userdata')
const { mongoose } = require('mongoose')

diseaseroute.get('/disease', async(req, res)=> {
    const diseasecheck = await diseasedata.find()
    console.log(diseasecheck)
    res.status(200).send(diseasecheck)
})

diseaseroute.patch("/diseaseadd1", async (req, res)=> {
    try {
        console.log(req.body)
        const Gid = req.body.userid;
        const updatedUSer = await loginuserdata.findOneAndUpdate({userid : Gid},{diseasedata : req.body.diseasedata},{new: true});
        return res.status(200).send(updatedUSer);
    } catch (error) {
        console.log(error?.message)
    }
})

diseaseroute.patch("/diseaseadd2", async (req, res)=> {
    try {
        console.log(req.body)
        const Gid = req.body.userid;
        const updatedUSer = await loginuserdata.findOneAndUpdate({userid : Gid},{diseasedata : req.body.diseasedata},{new: true});
        return res.status(200).send(updatedUSer);
    } catch (error) {
        console.log(error?.message)
    }
})

module.exports = diseaseroute;


