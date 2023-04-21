const mongoose = require("mongoose")


const familyDataSchema = mongoose.Schema({
    userIdData : {
        type: String
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

const familyData = new mongoose.model("FanilyData", familyDataSchema)

module.exports = familyData;