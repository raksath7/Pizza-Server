const user = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { createToken, decodeToken } = require("../utils/tokenManager");
const secretKey = process.env.JWT_SECRET;

const getAllUser = async (req, res) => {
  const users = await user.find();
  res.send(users);
  return users;
};

const signUpUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await user.findOne({ name: username });

    if (existingUser) {
      return res.status(401).json({ message: "Username already taken" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new user({
      name: username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.clearCookie("pizza-auth-token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({ message: "User SignedUp successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = await user.findOne({ name: username });
    if (!User) {
      return res.status(401).json({ message: "Invalid Username" });
    }
    const validPassword = await comparePassword(password, User.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    res.clearCookie("pizza-auth-token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    const token = await createToken({
      username: User.name,
      email: User.email,
      id: User._id.toString(),
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("pizza-auth-token", token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
      expires: expires,
    });
    return res
      .status(201)
      .json({ message: "Success", name: User.name, email: User.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error });
  }
};

const verifyUser = async (req, res) => {
  try {
    const User = await user.findById(res.locals.jwtData.id);
    if (!User) {
      return res.status(401).send("User not registered or Token malfunctioned");
    }
    if (User._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match");
    }
    return res.status(201).json({
      message: "Success",
      name: User.name,
      email: User.email,
      id: User._id.toString(),
    });
  } catch (error) {
    return res.status(400).json({ message: "Error", cause: error });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const User = await user.findOne({ email: req.body.email });
    // console.log(user);
    if (User) {
      const token = await createToken({ id: User._id });
      var transporter = nodemailer.createTransport({
        pool: true,
        service: "hotmail",
        // port: 2525,
        auth: {
          user: "",
          pass: "",
        },
      });

      var mailOptions = {
        from: "",
        to: `${req.body.email}`,
        subject: "Reset your password",
        text: `http://localhost:3000/resetPassword/${token}`,
        html: `
      <h1>Please try to remember the password...🤦‍♂️</h1>
      <h3>Reset Password For the username ${user.username}</h3>
      <a href="/resetPassword/${token}">👉Click here to reset Password</a>
      <h2>The link is valid upto 10 hours</h2>
      <h3>🙅‍♂️Try not to share the link🙅‍♂️</h3>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ message: "Check Your Mail" });
        }
      });
    } else {
      return res.status(400).json({ message: "User Doesn't Exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const data = await decodeToken(token);
  // console.log(data);
  await jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      // console.log(err);
      return res.json({ message: "Token Error" });
    } else {
      const hashedPassword = await hashPassword(password);
      userModal
        .findByIdAndUpdate({ _id: data.id }, { password: hashedPassword })
        .then((r) => {
          return res
            .status(200)
            .json({ message: "Password Updated Successfully" });
        })
        .catch((er) => {
          // console.log(er);
          return res.status(500).json({ message: "Internal Error", data: err });
        });
    }
  });
};

module.exports = {
  getAllUser,
  signUpUser,
  loginUser,
  verifyUser,
  forgetPassword,
  resetPassword,
};
