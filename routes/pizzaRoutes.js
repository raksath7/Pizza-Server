const { Router } = require("express");
const { getAllPizzas } = require("../controllers/pizzaControllter");

const pizzaRouter = Router();

pizzaRouter.get("/", getAllPizzas);

module.exports = pizzaRouter;
