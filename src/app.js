require("dotenv").config();
const http = require('http')
const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth")
const {Server} = require('socket.io')

require("./database/connection")

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
const port = process.env.PORT || 5000


//socket request
io.on('connection', (socket) => {
    socket.on('new_message', (msg) => {
        io.emit('new_message', msg);
        console.log(msg)
    })
})


// http request
const registerroute = require("./router/registerroute")
const loginroute = require("./router/loginroute")
const loginuserroute = require('./router/userdataroute')
const subjectroute = require('./router/subjectroute')
const diseaseroute = require("./router/diseaseroute");
const familyDataRoute = require("./router/familyDataroute");
const mailRoute = require("./router/nodemailer")
const paymentGatewayDataRoute = require("./router/paymentGatewayRoute")
const pdfCreateRoute = require("./router/pdfCreate")
const excelImportRoute = require("./router/excelimportroute")

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));  // allow req.body to contain any
app.use('/images', express.static('images'));
app.use(express.static('public'));
app.use(registerroute)
app.use(loginroute)
app.use(mailRoute)
app.use(pdfCreateRoute)
app.use(paymentGatewayDataRoute)
app.use(auth,loginuserroute)
app.use(subjectroute)
app.use(diseaseroute)
app.use(familyDataRoute)
app.use(excelImportRoute)

// app.send("hello")    
server.listen(port, () => {
    console.log(`connection done on ${port} port`);
  });
  