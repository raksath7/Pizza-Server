require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./db/connection");
const appRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/raks", appRouter);

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
