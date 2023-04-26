const mongoose = require("mongoose")


const familyDataSchema = mongoose.Schema({
    userIdData : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Regiserdata"
    },
    fname : {
        type : String
    },
    lname:{
        type: String
    },
    age : {
        type: String
    }
})

const familyData = new mongoose.model("FamilyData", familyDataSchema)

module.exports = familyData;