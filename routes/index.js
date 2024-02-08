const { Router } = require("express");
const userRouter = require("./userRoutes");
const pizzaRouter = require("./pizzaRoutes");

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/pizza", pizzaRouter);

module.exports = appRouter;
