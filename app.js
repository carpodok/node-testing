const { default: axios } = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
const { users } = require("./db");

app.get("/getUsers", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err,
    });
  }
});

app.use("/", require("./loginRoute"));

module.exports = app;
