const jwt = require("jsonwebtoken");

const createToken = async (payload) => {
  console.log(payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
const decodeToken = async (token) => {
  const data = await jwt.decode(token);
  return data;
};
const verifyToken = async (req, res, next) => {
  const token = req.signedCookies["pizza-auth-token"];
  // console.log(token);
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          console.log("Token Expired");
          return res.status(401).json({ message: "Token Expired" });
        } else {
          console.log("Token verified");
          res.locals.jwtData = success;
          return next();
        }
      });
    } catch (error) {
      console.log("verifyToken", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  }
};
module.exports = { createToken, verifyToken, decodeToken };
