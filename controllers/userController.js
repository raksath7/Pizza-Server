const user = require("../models/user");
const { hashPassword } = require("../utils/bcrypt");

const getAllUser = async () => {
  const users = await user.find();
  return users;
};

const signUpUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await user.findOne({ username });

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
    return res.status(200).json({ message: "User SignedUp successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllUser, signUpUser };
