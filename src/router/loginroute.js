const express = require("express");
const loginroute = new express.Router;
const User = require("../Models/register")

loginroute.post("/login", async (req,res)=> {
try {
    
    const email = req.body.emailvalue;
    const password = req.body.pass
// console.log(`${email} email and ${pass}`)
  const useremailverify =  await User.findOne({email: email})
if(useremailverify.pass === password){
    res.status("200").send("succesfull")
}
else{
    res.send("Invalid Details")
}
} catch (error) {
    res.send(error?.message)

}})

module.exports = loginroute