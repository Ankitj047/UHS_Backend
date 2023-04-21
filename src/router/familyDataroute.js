const express = require('express')
const familyData = require('../Models/familydata')
const familyDataRoute = new express.Router()


familyDataRoute.post("/familyAdd", async (req, res)=> {
    try {
        console.log(req.body,"req.body")
        const userData = new familyData(req.body)
        const familyDatas = await userData.save()
        return res.status(200).send(familyDatas)
    } catch (error) {
        res.send(error?.message)
    }
})


module.exports = familyDataRoute