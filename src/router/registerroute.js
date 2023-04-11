const express = require("express");
const registerroute = new express.Router;
const User = require("../Models/register")
const jwttoken = require('jsonwebtoken')

registerroute.post("/regissteruser", async (req, res) => {
    console.log(req.body)
    try {
      const userdata = new User(req.body);

      const token = await userdata.generateAuthToken()
      const createusers = await userdata.save();
      return res.status(200).send(createusers);
    } catch (error) {
        console.log(error)
      return res.status(401).send(error?.message);
    }
  });

  registerroute.get("/regissteruser", async (req, res) => {
    try {
      const registerData = await User.find();
      res.send(registerData);
    } catch (error) {
      return res.status(401).send(error?.message);
    }
  });

  //get individual data with id
  registerroute.get("/regissteruser/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const registerData = await User.findById(_id);
      console.log(registerData)
      if (!registerData) {
        return res.status(404).send();
      } else {
        res.send(registerData);
      }
  
      res.send(registerData);
    } catch (error) {
      return res.status(401).send(error?.message);
    }
  });

  // delete data with id
  registerroute.delete('/regissteruser/:id', async(req,res)=>{
  
    try {
        const _id = req.params.id;
    const deleteData  = await User.findByIdAndDelete(_id);
    if(!deleteData){
        return res.status(400).send()
    }
else{
    res.send(deleteData)
}
    } catch (error) {
        return res.status(500).send(error?.message);
    }
})

// udpate data
registerroute.patch("/regissteruser/:id", async (req, res)=>{
    try {
        const _id = req.params.id;
        const updatedata = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(updatedata)
    } catch (error) {
        return res.status(500).send(error?.message);
    }
})

module.exports = registerroute