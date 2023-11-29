const mongoose = require("mongoose")

const paymentSchema = mongoose.Schema({
    userId: {
type: mongoose.Schema.Types.ObjectId,
ref : "Registerdat"
    },
       fname: {
        type: String
    }
})

const paymentGatewayData = new mongoose.model("PayementGateWatData", paymentSchema)

module.exports = paymentGatewayData