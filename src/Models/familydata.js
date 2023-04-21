const mongoose = require("mongoose")


const familyDataSchema = mongoose.Schema({
    userID : {
        type: String
    },
    familyData : {
        type : Object
    }
})

const familyData = new mongoose.model("FanilyData", familyDataSchema)

module.exports = familyData;