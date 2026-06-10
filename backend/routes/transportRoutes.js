const express = require("express");
const router = express.Router();
const Transport = require("../models/Transport");

// GET all transport data
router.get("/", async (req, res) => {
  try {
    const transportData = await Transport.find();
    res.json(transportData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
