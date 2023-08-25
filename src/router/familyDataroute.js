const express = require("express");
const familyData = require("../Models/familydata");
const familyDataRoute = new express.Router();

familyDataRoute.patch("/familyAdd", async (req, res) => {
  try {
    const check = req.body.familyData;
    const userId = req.body.userID;
    const mapCheck = check.map((item) => Object.assign(item, { userId }));
    const userData = mapCheck.map(async (item) => {
      const itemId = item?._id;
      let previoususer = familyData.findOne({ _id: itemId });
      if (previoususer && itemId !== undefined ) {
        const updateFamilyUser = await familyData.findOneAndUpdate({ _id: itemId }, item,{ new: true });
      } else {
        console.log("in")
        const newData = new familyData(item);
        await newData.save();
      }
    });
return res.status(200).send({message:"succesfull"})    
  } catch (error) {
    res.status(505).send(error?.message);
  }
});

familyDataRoute.get("/familyDataGet", async (req, res) => {
  try {
    const id = req.query.userID;
    const getFamilyData = await familyData.find({ userId: id });
    res.send(getFamilyData);
  } catch (error) {
    res.send(error?.message);
  }
});

familyDataRoute.delete("/familyMemberDelete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await familyData.findByIdAndDelete(_id);
    if (!deleteData) {
      return res.status(400).send("this id not available");
    } else {
      res.send(deleteData);
    }
  } catch (error) {
    console.log(error?.message);
  }
});

module.exports = familyDataRoute;
