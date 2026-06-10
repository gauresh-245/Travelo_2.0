const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
const Booking = require("../models/Booking"); // ✅ REQUIRED

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

// VERIFY PAYMENT
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      bookingId,
    } = req.body;

    // 🔥 UPDATE BOOKING STATUS
    await Booking.findByIdAndUpdate(bookingId, {
      status: "CONFIRMED",
      paymentId: razorpay_payment_id,
    });

    res.json({
      success: true,
      message: "Payment verified & booking confirmed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
