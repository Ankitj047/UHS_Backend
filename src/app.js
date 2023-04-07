const express = require("express");
const cors = require("cors");

require("./database/connection")

const app = express()
const port = process.env.PORT || 5000
const registerroute = require("./router/registerroute")
const loginroute = require("./router/loginroute")

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.use(registerroute)
app.use(loginroute)
// app.send("hello")    
app.listen(port, () => {
    console.log(`connection done on ${port} port`);
  });
  