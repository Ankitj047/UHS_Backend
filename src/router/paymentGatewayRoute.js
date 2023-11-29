const express = require("express");
const paymentGatewayDataRoute = new express.Router();
const paymentGatewayData = require("../Models/paymentGateway");
const Razorpay = require("razorpay");
// import Razorpay from "razorpay";

// RAZORPAY_API_KEY = rzp_test_XZX7RfPrH2INPt
// RAZORPAY_API_SECRET = ZqVDbwEdvRoY0mOXeu25Kl01

const instance = new Razorpay({
  key_id: "rzp_test_XZX7RfPrH2INPt",
  key_secret: "ZqVDbwEdvRoY0mOXeu25Kl01",
});

paymentGatewayDataRoute.post("/paymentGatewayTest", async (req, res) => {
  try {
    const data = new paymentGatewayData(req.body);
    const createData = await data.save();
    return res.status(200).send(createData);
  } catch (error) {
    console.log(error?.message);
  }
});

paymentGatewayDataRoute.post("/checkout", async (req, resp) => {
  try {

    const options = {
      amount: 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    resp.status(200).send({ message: "succesfull" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = paymentGatewayDataRoute;
