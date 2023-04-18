const mongoose = require('mongoose')

const diseaseSchema = mongoose.Schema({
    name: {type: String},
    type: {type: String},
    isChecked: {type:Boolean}
})

const diseasedata = new mongoose.model("diseases",diseaseSchema)
module.exports = diseasedata