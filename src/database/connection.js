const mongoose = require("mongoose");
const connectionstring = process.env.MONGO_URI
mongoose
  .connect("mongodb://0.0.0.0:27017/UHS-Backend")
  // .connect(connectionstring)
  .then(() => console.log("connection Successfull"))
  .catch((err) => console.log(err, "no connections"));
