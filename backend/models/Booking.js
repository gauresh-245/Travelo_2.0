const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: String,
    userName: String,

    // Hotel Info
    hotel_name: String,
    location: String,
    hotel_image: String,
    hotel_price: Number,
    hotel_address: String,
    hotel_rating: Number,

    transportType: {
  type: String,
  enum: ["hotel", "train", "flight"],
  default: "hotel",
},

    // Booking Info
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    total_nights: Number,
    amount: Number,

    status: {
      type: String,
      enum: [
        "REQUESTED",
        "APPROVED",
        "CONFIRMED",   
        "REJECTED",
        "PAID",
        "CANCELLATION_REQUESTED",
        "CANCELLED",
      ],
      default: "REQUESTED",
    },

    

    cancellationReason: String,

    booking_reference: {
      type: String,
      unique: true,
      default: () =>
        "BK" +
        Date.now() +
        Math.random().toString(36).substr(2, 6).toUpperCase(),
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
