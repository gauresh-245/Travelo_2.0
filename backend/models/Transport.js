const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    destination: String,
    nearestHub: String,
    flow: String,
    trains: [
      {
        name: String,
        number: String,
        from: String,
        to: String,
        class: String,
        price: Number,
        route: String,
      },
    ],
    flights: [
      {
        airline: String,
        flightNo: String,
        from: String,
        to: String,
        price: Number,
        duration: String,
      },
    ],
  },
  { collection: "TrainFlightsdata" }
); // Force it to use your specific collection name

module.exports = mongoose.model("Transport", transportSchema);
