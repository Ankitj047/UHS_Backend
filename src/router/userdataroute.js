const express = require("express");
const loginuserroute = new express.Router();
const loginuserdata = require("../Models/userdata");

loginuserroute.patch("/userpersonaldata", async (req, res) => {
  try {
    const _id = req.body.userid;
    const userdataa = await loginuserdata.findOne({ userid: _id });

    if (userdataa) {
      const updatedUSer = await loginuserdata.findOneAndUpdate({ userid: _id },req.body,{new: true});
      return res.status(200).send("updated");
    } else {
      const userdata = new loginuserdata(req.body);
      const createusers = await userdata.save();
      return res.status(200).send("Successfull");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error?.message);
  }
});

loginuserroute.get("/userpersonaldata", async (req, res) => {
  try {
    const userdata = await loginuserdata.find();
    res.status(200).send(userdata);
  } catch (error) {
    console.log(error);
  }
});

loginuserroute.get("/userpersonaldata/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userdata = await loginuserdata.findOne({ userid: _id });
    console.log(userdata);
    if (!userdata) {
      return res.status(404).send();
    } else {
      return res.send(userdata);
    }
    res.send(userdata);
  } catch (error) {
    return res.status(401).send(error?.message);
  }
});

loginuserroute.patch("/familydata", async (req, res) => {
  try {
    const _id = req.body.userid;
      const updatedUSer = await loginuserdata.findOneAndUpdate({userid : _id}, {familydata : req.body.familydata},{new : true});
      console.log(req.body,"body")
      return res.status(200).send(updatedUSer);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error?.message);
  }
});

module.exports = loginuserroute;
