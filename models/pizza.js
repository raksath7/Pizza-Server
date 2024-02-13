const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const pizzaSchema = mongoose.Schema({
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
  base: {
    type: String,
    required: true,
  },
  sauce: {
    type: String,
    required: true,
  },
  cheese: {
    type: String,
    required: true,
  },
  veggies: {
    type: String,
    required: true,
  },
  meat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
