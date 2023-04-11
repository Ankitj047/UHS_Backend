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

  const isMatch = await bcrypt.compare(password, useremailverify.pass)

  const token = await useremailverify.generateAuthToken()

  const token1 = jwt.sign({
    token: token
}, 'secret', { expiresIn: 3000 });

console.log(token1,"token1")

setTimeout(()=> {console.log(token1,"token1check")}, 4000)

if (useremailverify !== null){
if(isMatch){
    res.status(200).send({ id :useremailverify._id, messaage: "successful", token: token})
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