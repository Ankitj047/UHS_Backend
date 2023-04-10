const express = require('express')
const loginuserroute = new express.Router;
const loginuserdata = require('../Models/userdata')


loginuserroute.post("/userpersonaldata", async (req, res) => {
    try {
      const userdata = new loginuserdata(req.body);
      const createusers = await userdata.save();
      return res.status(200).send(createusers);
    } catch (error) {
        console.log(error)
      return res.status(401).send(error?.message);
    }
  });

module.exports = loginuserroute