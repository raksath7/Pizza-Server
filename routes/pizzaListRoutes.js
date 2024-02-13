const { Router } = require("express");
const { getAllPizzas } = require("../controllers/pizzaListController");

const pizzaListRouter = Router();

pizzaListRouter.get("/", getAllPizzas);

module.exports = pizzaListRouter;
