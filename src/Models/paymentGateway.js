const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registerdat",
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
});

const paymentGatewayData = new mongoose.model("PayementGateWatData", paymentSchema);

module.exports = paymentGatewayData;
