const express = require("express");
const exceltestdata = require("../Models/exceltestdata");
const excelImportRoute = new express.Router();


excelImportRoute.post("/excelImportTestRoute", async (req, res)=>{
    try {
        
       const excelData = new exceltestdata(req.body)
       const createExcelData = await  excelData.save()

       return res.status(200).send(createExcelData)
        res.json.set()
    } catch (error) {
        console.log(error?.message)
    }
})


module.exports = excelImportRoute;