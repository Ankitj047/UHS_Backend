const express = require("express");
const loginroute = new express.Router;
const User = require("../Models/register")

loginroute.post("/login", async (req,res)=> {
try {
    const email = req.body.emailvalue;
    const password = req.body.pass
// console.log(`${email} email and ${password}`) 
  const useremailverify =  await User.findOne({email: email})
if (useremailverify !== null){
    
if(useremailverify.pass === password){
    res.status(200).send({ id :useremailverify._id, messaage: "successful"})
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