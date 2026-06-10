const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  address: String,
  state: String,
  phone: String,
  email: String,
  type: String,
  rooms: {
    type: String,
    default: "N/A",
  },
  budget: String,
  whoTraveling: String,
  facilities: String,
  availability: String,
  guestReviews: String,
  pricePerNight: Number,
  distance: String,
  starRating: Number,
  imageUrl: String,
  destination: String,
});

module.exports = mongoose.model("Hotel", hotelSchema);
