const express = require("express");
const bcrypt = require("bcrypt")
const loginroute = new express.Router;
const User = require("../Models/register")
var jwt = require('jsonwebtoken');

loginroute.post("/login", async (req,res)=> {
try {
    const email = req.body.emailvalue;
    const password = req.body.pass
// console.log(`${email} email and ${password}`) 
  const useremailverify =  await User.findOne({email: email})
  console.log(useremailverify._id,"useremailverify")

  const isMatch = await bcrypt.compare(password, useremailverify.pass)

  const token1 = jwt.sign({
    userid: useremailverify._id , email : useremailverify.email
}, process.env.SECRET_KEY, {expiresIn: "1h"});

if (useremailverify !== null){
if(isMatch){
    res.status(200).send({ id :useremailverify._id, messaage: "successful", token: token1})
}
else{
    res.send("Invalid password")
}}
else {
res.send("Invalid mail")
}
} catch (error) {
    res.send(error?.message)

}})

module.exports = loginroute