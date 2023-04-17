require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth")

require("./database/connection")

const app = express();
const port = process.env.PORT || 5000
const registerroute = require("./router/registerroute")
const loginroute = require("./router/loginroute")
const loginuserroute = require('./router/userdataroute')

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(registerroute)
app.use(loginroute)
app.use(auth,loginuserroute)
// app.send("hello")    
app.listen(port, () => {
    console.log(`connection done on ${port} port`);
  });
  