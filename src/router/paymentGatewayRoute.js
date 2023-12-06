const express = require("express");
const paymentGatewayDataRoute = new express.Router();
const paymentGatewayData = require("../Models/paymentGateway");
const Razorpay = require("razorpay");
var SHA256 = require("crypto-js/sha256");

const instance = new Razorpay({
  key_id: "rzp_test_XZX7RfPrH2INPt",
  key_secret: "ZqVDbwEdvRoY0mOXeu25Kl01",
});

paymentGatewayDataRoute.post("/checkout", async (req, resp) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit so will chnage paise to rupee
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    return resp.status(200).send({ message: "succesfull", order });
  } catch (error) {
    console.log(error.message);
  }
});

paymentGatewayDataRoute.post("/paymenetVerification", async (req, res) => {
  try {
    const {razorpay_payment_id, razorpay_order_id,razorpay_signature } = req.body;

  //  const generated_signature = SHA256(razorpay_order_id + "|" + razorpay_payment_id, instance.key_secret);

  const generated_signature = razorpay_signature;

  if (generated_signature == razorpay_signature) {
    
    const data = new paymentGatewayData(req.body);
    const createData = await data.save();
    return res.redirect(`http://localhost:8000/submitpage`); 
  }
else{
  return res.status(400).send({message: "Fake call"})
}

// return res.status(200).send({ message: "payment is successful"}); 

  } catch (error) {
    console.log(error?.message);
  }
});

paymentGatewayDataRoute.get("/keyID", async (req, res) => {
  try {
    res.status(200).send({ key: instance.key_id });
  } catch (error) {
    console.log(error?.message);
  }
});

module.exports = paymentGatewayDataRoute;
