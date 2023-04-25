const mongoose = require('mongoose')


const diseaseDataSchema = mongoose.Schema({
    userid : {
        type: String,
        ref : "User"
    },
    diseasesID : {
        type: String
    },
    personId: {
        type: String
    },
    ISchecked : {
        type: Boolean
    }
})

const userDiseaseData = new mongoose.model("Userdieseasdata", diseaseDataSchema)

module.exports = userDiseaseData;