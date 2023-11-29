const express = require("express");
const paymentGatewayDataRoute = new express.Router();
const paymentGatewayData = require("../Models/paymentGateway");

paymentGatewayDataRoute.post("/paymentGatewayTest", async (req, res) => {
    try {
        const data = new paymentGatewayData(req.body);
        const createData = await data.save();
        return res.status(200).send(createData)

    } catch (error) {
console.log(error?.message)        
    }
})

module.exports = paymentGatewayDataRoute