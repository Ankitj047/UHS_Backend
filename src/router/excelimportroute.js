const express = require("express");
const registeruser = require("../Models/register");
const excelImportRoute = new express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const loginuserdata = require("../Models/userdata");

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

      const regiterAddData = jsonData.map(({ email, pass }) => ({
        email,
        pass,
      }));

      let saveRegisterData = await registeruser.create(regiterAddData);

      const UserData = [];
      const newuserData = []
      const newData = jsonData.map(async (item) => {
        const checkData = await registeruser.findOne({ email: item.email });
        const newCheckdata = await UserData.push(checkData);

   UserData.map((test) => {
          if (item.email == test.email) {
            const newTestdata = newuserData.push({ ...item, userId: test._id });
            const UserAddData = newuserData.map(({ fname, lname, age, email, phone, isaccept, userId }) => ({fname, lname, age, email, phone, isaccept, userId}));
            let saveUserData = loginuserdata.create(UserAddData);
          }
        });
      });

      return res.status(201).json({
        success: true,
        message: saveRegisterData.length + " rows added to the database",
        RegisterData: saveRegisterData
      });
    } catch (error) {
      console.log(error?.message);
    }
  }
);

module.exports = excelImportRoute;
