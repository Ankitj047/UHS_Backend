const mongoose = require('mongoose')


const priceListSchema = mongoose.Schema({
agegroup : {type : Number},
dieasesType : {type : String},
price: {type: Number},
IsActive: {type: Boolean} 
})

const finalPriceAcceptSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Regiserdata"
    },
IsAccept : {type: Boolean},
finalPrice: {type: Number}
})

const priceList = new mongoose.model("priceList", priceListSchema)
const FinalPrice = new mongoose.model("finalPriceData", finalPriceAcceptSchema)

module.exports = priceList;
module.exports = FinalPrice