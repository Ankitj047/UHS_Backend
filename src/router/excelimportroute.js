const express = require("express");
const exceltestdata = require("../Models/exceltestdata");
const excelImportRoute = new express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.name)
  },
})

const upload = multer({ storage: storage });

excelImportRoute.post("/excelImportTestRoute", upload.single("file"), async (req, res) => {
    console.log(req.file, "req.file")
    
       try {
      const workBook = xlsx.read(req.file);
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = xlsx.utils.sheet_to_json(workSheet, {
        raw: false,
      });

      console.log(data,"data")
      //  return res.send("Single file")
    } catch (error) {
      
    }
 
  // try {
  //   const excelData = new exceltestdata(req.body);
  //   const createExcelData = await excelData.save();

  //   return res.status(200).send(createExcelData);
  // } catch (error) {
  //   console.log(error?.message);
  // }
});

module.exports = excelImportRoute;
