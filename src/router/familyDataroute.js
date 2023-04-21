const express = require('express')
const familyData = require('../Models/familydata')
const familyDataRoute = new express.Router()


familyDataRoute.post("/familyAdd", async (req, res)=> {
    try {
        const check = req.body.familyData
        userIdData = req.body.userID
        const mapCheck = check.map((item)=> (Object.assign(item, {userIdData})) )
        const userData =  mapCheck.map(async(item)=> {
            const newData =  new familyData(item)
            await newData.save()})
        return res.status(200).send(userData)
    } catch (error) {
        res.send(error?.message)
    }
})




module.exports = familyDataRoute