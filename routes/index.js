const { Router } = require("express");
const userRouter = require("./userRoutes");
const pizzaRouter = require("./pizzaRoutes");
const pizzaListRouter = require("./pizzaListRoutes");

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/pizza", pizzaRouter);
appRouter.use("/pizzaList", pizzaListRouter);
module.exports = appRouter;
