const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/UHS-Backend")
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log(err, "no connections"));
