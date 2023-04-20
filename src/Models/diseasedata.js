const mongoose = require('mongoose')


const diseaseDataSchema = mongoose.Schema({
    userid : {
        type: String,
        ref : "User"
    },
    diseasesData : {
        type: Array
    }
})

const userDiseaseData = new mongoose.model("Userdieseasdata", diseaseDataSchema)

module.exports = userDiseaseData;