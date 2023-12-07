const express = require("express");
const pdfCreateRoute = new express.Router();
var pdf = require("pdf-creator-node");
const pdfTemplate = require("./pdfTemplate");
const loginuserdata = require("../Models/userdata");
const nodemailer = require("nodemailer");

pdfCreateRoute.post("/pdfCreate", async (req, resp) => {
  const _id = await req.body.userId;
  console.log(_id, "_id ");
  const userdataa = await loginuserdata.findOne({ userId: _id });

  console.log(userdataa, "data");

  let email = userdataa?.email;
  let name = userdataa?.fname;

  const siteId = new Date().getTime();
  const sitePDFPath = `/pdf/${siteId}.pdf`;

  const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
  };

  const document = {
    html: pdfTemplate,
    data: {
      siteId: siteId,
      customer: `${userdataa?.fname} ${userdataa?.lname}`,
      age: `${userdataa?.age}`,
      phone: `${userdataa?.phone}`,
    },
    path: "public" + sitePDFPath,
  };

  await pdf
    .create(document, options)
    .then(async () => {
      // await siteModel.findByIdAndUpdate(siteId, {
      //   sitePDFPath: sitePDFPath,
      // });

      try {
        let testAccount = await nodemailer.createTestAccount();
        // connect SMTP server
        let transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ifour.ankitjain@gmail.com",
            pass: "zllfywuqwfbecjjt",
          },
        });

        let info = await transporter.sendMail({
          from: 'ankit" <ifour.ankitjain@gmail.com>', // sender address
          to: "ifour.ankitjain@gmail.com", // list of receivers
          subject: `Process Done Successfully`, // Subject line
          text: "Hello world?", // plain text body
          html: `Hello ${name}, Your Registration done successfully and as per your info you are eligible for UHS term plan.<br/>
          'Thanks,'
          'Team.'`, // html body
          attachments: document,
        });
        console.log("Message sent: %s", info.messageId);
        // res.status(200).send("Mail sent");
        return res.json(info.response);
      } catch (error) {
        console.log(error?.message);
      }
      return resp.send({ message: "successfull" });
    })
    .catch((error) => {
      console.log("error", error);
    });

  
});

module.exports = pdfCreateRoute;
