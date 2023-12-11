const mongoose = require('mongoose')

const excelSchema = mongoose.Schema({
    title :{type: String},
    content: {type: String},
    category: {type: String}
})

const excelData = new mongoose.model("exceltestdata", excelSchema)

module.exports = excelData