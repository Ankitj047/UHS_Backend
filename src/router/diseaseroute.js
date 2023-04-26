const express = require("express");
const diseaseroute = new express.Router();
const diseasedata = require("../Models/diesease");
const loginuserdata = require("../Models/userdata");
const userDiseaseData = require("../Models/diseasedata");
const { mongoose } = require("mongoose");

diseaseroute.get("/disease", async (req, res) => {
  const diseasecheck = await diseasedata.find();
  res.status(200).send(diseasecheck);
});

diseaseroute.post("/dieasedata", async (req, res) => {
try {
  const checkData = req.body
const data = checkData.map( async (item)=> {
  const previoususer = await userDiseaseData.findOneAndDelete({personId : item.personId, diseasesID: item.diseasesID})
  if (item.ISchecked == true){
const dieasedata = new userDiseaseData(item)
const updateDiease = await dieasedata.save()
}
}
)
return res.status(200).send({message: "successfull"})
} catch (error) {
  res.status(400).send(error?.message)
}
});

diseaseroute.get("/dieasesDataGet", async (req, res) => {
  try {
    const Id = req.query.userId;
    const getData = await userDiseaseData.find({ userid: { $in: Id } });
    return res.status(200).send(getData);
  } catch (error) {
    console.log(error?.message);
  }
});

module.exports = diseaseroute;
