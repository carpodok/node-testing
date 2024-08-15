const { default: axios } = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/getCommentsById", async (req, res) => {
  const postId = req.query.postId;

  if (!postId) {
    return res
      .status(400)
      .json({ success: false, message: "Post ID is required" });
  }

  try {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

    const response = await axios.get(url);
    const comment = response.data;

    if (!comment || comment.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No comments found" });
    }

    return res.status(200).json({ success: true, data: comment });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", err });
  }
});

module.exports = app;
