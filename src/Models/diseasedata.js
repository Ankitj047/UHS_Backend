const mongoose = require('mongoose')


const diseaseDataSchema = mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Regiserdata"
    },
    diseasesID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "diseases"
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "FamilyData"
    },
    ISchecked : {
        type: Boolean
    },
    
})

const userDiseaseData = new mongoose.model("Userdieseasdata", diseaseDataSchema)

module.exports = userDiseaseData;