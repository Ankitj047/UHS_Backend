const express = require('express')
const familyData = require('../Models/familydata')
const familyDataRoute = new express.Router()


familyDataRoute.post("/familyAdd", async (req, res)=> {
    console.log(req.body)
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

familyDataRoute.get("/familyDataGet", async (req, res)=> {
    try {
        const id = req.query.userID
        console.log(id)
        const getFamilyData = await familyData.find({userIdData:id})
        res.send(getFamilyData)
    } catch (error) {
        res.send(error?.message)
    }
})
module.exports = familyDataRoute