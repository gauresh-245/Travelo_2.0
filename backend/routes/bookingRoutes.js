const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ======================================================
// 1️⃣ USER: SEND BOOKING REQUEST (NO PAYMENT)
// ======================================================
router.post("/request", verifyToken, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.userId,
      status: "REQUESTED", // 🔥 IMPORTANT
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking request sent to admin",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================================================
// 2️⃣ USER: GET MY BOOKINGS (MyTrips Page)
// ======================================================
router.get("/my-bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================================================
// 3️⃣ ADMIN: GET ALL BOOKING REQUESTS
// ======================================================
router.get(
  "/admin/booking-requests",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const requests = await Booking.find({
        status: "REQUESTED",
      }).populate("userId", "username email");

      res.json({
        success: true,
        requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ======================================================
// 4️⃣ ADMIN: APPROVE BOOKING REQUEST
// ======================================================
router.put(
  "/admin/approve-booking/:id",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      booking.status = "APPROVED";
      await booking.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ======================================================
// 5️⃣ ADMIN: REJECT BOOKING REQUEST
// ======================================================
router.put(
  "/admin/reject-booking/:id",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      booking.status = "REJECTED";
      await booking.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ======================================================
// 6️⃣ USER: REQUEST CANCELLATION
// ======================================================
router.put("/request-cancel/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Only PAID bookings can be cancelled
    if (booking.status !== "CONFIRMED") {
      return res
        .status(400)
        .json({ message: "Cancellation not allowed" });
    }

    booking.status = "CANCELLATION_REQUESTED";
    booking.cancellationReason = req.body.reason;

    await booking.save();

    res.json({
      success: true,
      message: "Cancellation request sent to admin",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ======================================================
// 7️⃣ ADMIN: VIEW CANCELLATION REQUESTS
// ======================================================
router.get(
  "/admin/cancellation-requests",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const requests = await Booking.find({
        status: "CANCELLATION_REQUESTED",
      }).populate("userId", "username email");

      res.json({
        success: true,
        requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ======================================================
// 8️⃣ ADMIN: APPROVE CANCELLATION
// ======================================================
router.put(
  "/admin/approve-cancel/:id",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      booking.status = "CANCELLED";
      await booking.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// ======================================================
// 9️⃣ ADMIN: REJECT CANCELLATION
// ======================================================
router.put(
  "/admin/reject-cancel/:id",
  verifyToken,
  adminMiddleware,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);

      booking.status = "PAID";
      await booking.save();

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

router.put(
  "/confirm-payment/:id",
  verifyToken,
  async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.status !== "APPROVED")
      return res.status(400).json({ message: "Booking not approved yet" });

    booking.status = "CONFIRMED";
    await booking.save();

    res.json({ success: true, message: "Payment confirmed" });
  }
);


module.exports = router;
