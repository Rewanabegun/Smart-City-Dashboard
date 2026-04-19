const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.json({
    message: "Traffic API working 🚦",
    data: []
  });
});

module.exports = router;