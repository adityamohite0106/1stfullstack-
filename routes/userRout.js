// (Handles user-related routes)

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("hello bhai");
  } catch (err) {
    next(err);
  }
});

module.exports = router;



// How They Work Together//

// User requests http://localhost:3000/api/users/1
// index.js directs request to userRoutes.jsr
// userRoutes.js processes request and responds
// If an error occurs, it calls next(err), sending it to errorHandlerMiddleware.js
// errorHandlerMiddleware.js sends a proper JSON error response