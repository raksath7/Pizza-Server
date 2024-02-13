const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const orderSchema = mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      pizzaId: { type: Schema.Types.ObjectId, ref: "Pizza" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  status: String,
  timestamp: Date,
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
