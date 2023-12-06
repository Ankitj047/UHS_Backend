const express = require('express');
const pdfCreateRoute = new express.Router();
var pdf = require("pdf-creator-node");
const pdfTemplate = require("./pdfTemplate");
const loginuserdata = require('../Models/userdata');

pdfCreateRoute.post('/pdfCreate', async (req, resp)=>{

    const _id = await req.body.userId;
    console.log(_id ,"_id ")
    const userdataa = await loginuserdata.findOne({ userId: _id });

console.log(userdataa,"data")

    const siteId = new Date().getTime()
    const sitePDFPath = `/pdf/${siteId}.pdf`;

    const options = {
        format: 'A3',
        orientation: 'portrait',
        border: '10mm',
      };

    const document = {
        html: pdfTemplate,
        data: {
          siteId: siteId,
          customer: `${userdataa?.fname} ${userdataa?.lname}`,
          age: `${userdataa?.age}`,
          phone: `${userdataa?.phone}`
        },
        path: 'public' + sitePDFPath,
      };

      await pdf
    .create(document, options)
    // .then(async () => {
    //   await siteModel.findByIdAndUpdate(siteId, {
    //     sitePDFPath: sitePDFPath,
    //   });
    // })
    // .catch((error) => {
    //   console.log('error', error);
    // });

    return resp.send({message: "successfull"})
})

module.exports = pdfCreateRoute