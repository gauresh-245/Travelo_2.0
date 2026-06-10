// backend/routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// GET /api/hotels/filter?destination=Goa&budget=Cheap
router.get("/filter", async (req, res) => {
  try {
    const { destination, budget } = req.query;

    // REQUIRED: destination
    const filter = {
      destination: { $regex: destination, $options: "i" },
    };

    // OPTIONAL: budget filter
    if (budget && budget !== "All") {
      filter.budget = { $regex: budget, $options: "i" };
    }

    // Fetch hotels (ignore travelType, ignore whoTraveling)
    const hotels = await Hotel.find(filter).sort({ pricePerNight: 1 });

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
