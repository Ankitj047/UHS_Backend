const mongoose = require('mongoose')


const priceListSchema = mongoose.Schema({
agegroup : {type : Number},
dieasesType : {type : String},
price: {type: Number},
IsActive: {type: Boolean} 
})


const priceList = new mongoose.model("priceList", priceListSchema)

module.exports = priceList