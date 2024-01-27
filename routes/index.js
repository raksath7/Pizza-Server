const { Router } = require("express");
const userRouter = require("./userRoutes");

const appRouter = Router();

appRouter.use("/user", userRouter);

module.exports = appRouter;
