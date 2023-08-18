const express = require("express");
const nodemailer = require("nodemailer");
const mailRoute = new express.Router();

mailRoute.post("/sentMail", async (req, res) => {
   let email = req.body.email;
   let name = req.body.name;

  try {
    let testAccount = await nodemailer.createTestAccount();
    // connect SMTP server
    let transporter = await nodemailer.createTransport({
    service: "gmail",
      auth: {
        user: 'ifour.ankitjain@gmail.com',
        pass: 'zllfywuqwfbecjjt',
      },
    });

    let info = await transporter.sendMail({
        from: 'ankit" <ifour.ankitjain@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `For Reset Password`, // Subject line
        text: "Hello world?", // plain text body
        html:`Hello ${name}, please copy the link <a href=https://localhost:5000/forgotpassword/${email}>copy the link</a> and paste for password change.<br/>
        'Thanks,'
        'Team. '`, // html body
    })
    console.log("Message sent: %s", info.messageId);
    // res.status(200).send("Mail sent");
    res.json(info.response)

  } catch (error) {
    res.status(400).send(error?.message);
  }
});

module.exports = mailRoute;
