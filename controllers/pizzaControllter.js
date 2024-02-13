const pizza = require("../models/pizza");

const getAllPizzas = async (req, res) => {
  const pizzas = await pizza.find();
  res.send(pizzas);
};

module.exports = { getAllPizzas };
