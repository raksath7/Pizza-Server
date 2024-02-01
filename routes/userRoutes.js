const { Router } = require("express");
const {
  getAllUser,
  signUpUser,
  loginUser,
  verifyUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const { verifyToken } = require("../utils/tokenManager");

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/forgetPassword", forgetPassword);
userRouter.post("/resetPassword/:token", resetPassword);

module.exports = userRouter;
