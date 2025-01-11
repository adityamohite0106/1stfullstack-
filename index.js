//this is the main server 
const express = require("express");
const errorHandler = require("./middlewares/errorHandler.middleware");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(errorHandler);
dotenv.config();

app.get("./", (req, res) => {
  try {
    res.send("Hello bhai");
  } catch {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});



// index.js file