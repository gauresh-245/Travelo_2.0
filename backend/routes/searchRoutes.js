const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// /api/search?query=Goa
router.get("/", async (req, res) => {
  const query = req.query.query || "";

  try {
    const places = await Hotel.find({
      destination: { $regex: query, $options: "i" },
    })
      .limit(10)
      .distinct("destination"); // Avoid duplicate values

    const response = places.map((p) => ({
      placeName: p,
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
