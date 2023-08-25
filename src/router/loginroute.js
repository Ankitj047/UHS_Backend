const express = require("express");
const bcrypt = require("bcrypt")
const loginroute = new express.Router;
const User = require("../Models/register")
var jwt = require('jsonwebtoken');

loginroute.post("/login", async (req,res)=> {
try {
    const email = req.body.emailvalue;
    const password = req.body.pass
  const useremailverify =  await User.findOne({email: email})

  const isMatch = await bcrypt.compare(password, useremailverify.pass)

  const token1 = jwt.sign({
    userId: useremailverify._id , email : useremailverify.email
}, process.env.SECRET_KEY, {expiresIn: "1d"});

if (useremailverify !== null){
if(isMatch){
    res.status(200).send({ id :useremailverify._id, messaage: "successful", token: token1})
}
else{
    res.status(400).send("Invalid password")
}}
else {
res.send("Invalid mail")
}
} catch (error) {
    res.send(error?.message)

}})

module.exports = loginroute