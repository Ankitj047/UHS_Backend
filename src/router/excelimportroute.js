const express = require("express");
const exceltestdata = require("../Models/exceltestdata");
const excelImportRoute = new express.Router();
const multer = require("multer");
const XLSX = require("xlsx");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

excelImportRoute.post(
  "/excelImportTestRoute",
  upload.single("file"),
  async (req, res) => {
    console.log(req.file, "req.file");
    try {
      let path = req.file.path;
      var workbook = XLSX.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }

      let saveData = await exceltestdata.create(jsonData);
      return res.status(201).json({
        success: true,
        message: saveData.length + " rows added to the database",
      });
    } catch (error) {
      console.log(error?.message);
    }

    // try {
    //   const excelData = new exceltestdata(req.body);
    //   const createExcelData = await excelData.save();

    //   return res.status(200).send(createExcelData);
    // } catch (error) {
    //   console.log(error?.message);
    // }
  }
);

module.exports = excelImportRoute;
