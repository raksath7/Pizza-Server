const { Router } = require("express");
const { getAllUser, signUpUser } = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signUpUser);

module.exports = userRouter;
