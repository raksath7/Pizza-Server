const pizzaList = require("../models/pizzaList");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const getAllPizzas = async (req, res) => {
  const pizzas = await pizzaList.find();
  res.send(pizzas);
};

module.exports = { getAllPizzas };
