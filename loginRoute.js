const express = require("express");
const app = express();
const router = express.Router();
const { users } = require("./db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid password" });
  }

  res.status(200).json({
    success: true,
    data: { username: user.username, email: user.email },
  });
});

module.exports = router;
