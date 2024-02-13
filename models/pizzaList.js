const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const pizzaListSchema = mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PizzaList", pizzaListSchema);
