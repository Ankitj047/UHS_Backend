const express = require("express");
const loginuserroute = new express.Router();
const loginuserdata = require("../Models/userdata");
const multer = require("multer")
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

//img storage path
const imgconfig = multer.diskStorage({
  destination: (req,file,callback)=>{
    callback(null,'public/images')
  },
  filename: (req,file,callback)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, uuidv4() + '-' + fileName)
    // callback(null,`image-${Date.now()}-${file.originalname}`)
  }
})

//img filter

const isImage = (req,file,callback)=> {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    callback(null, true);
} else {
  callback(null, false);
    return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
}
}

const Upload = multer({
  storage: imgconfig,
  fileFilter:isImage
}) 

loginuserroute.patch("/userpersonaldata", Upload.single("profilephoto") ,async (req, res) => {
  try {
    const _id = req.body.userid;
    const url = req.protocol + '://' + req.get('host')
    const userdataa = await loginuserdata.findOne({ userid: _id });

    if (userdataa) {
      const updatedUSer = await loginuserdata.findOneAndUpdate({ userid: _id },req.body,{new: true});
      return res.status(200).send({message: "Updated"});
    } else {
      const userdata = new loginuserdata({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        isaccept : req.body.isaccept,
        diseasedes: req.body.diseasedes,
        userid: req.body.userid,
        profilephoto: url + '/images/' + req.file.filename ,
        familydata: req.body.familydata,
      });
      const createusers = await userdata.save();
      return res.status(200).send({message: "Successfull"});
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

// loginuserroute.patch("/familydata", async (req, res) => {
//   try {
//     const _id = req.body.userid;
//       const updatedUSer = await loginuserdata.findOneAndUpdate({userid : _id}, {familydata : req.body.familydata},{new : true});
//       console.log(req.body,"body")
//       return res.status(200).send(updatedUSer);
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send(error?.message);
//   }
// });


module.exports = loginuserroute;
