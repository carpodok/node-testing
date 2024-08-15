require("dotenv").config();
const app = require("./app");

app.listen(3001, () => console.log("Server is running on PORT:3001"));
