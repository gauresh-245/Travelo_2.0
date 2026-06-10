require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const Hotel = require("./models/Hotel.js");

// -------------------------
// CONNECT TO MONGODB
// -------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// -------------------------
// READ CSV FILE
// -------------------------
const results = [];

fs.createReadStream("./uploads/hotels.csv") // Your CSV file
  .pipe(csv())
  .on("data", (row) => {
    // ---------------------------------------------------
    // SKIP BLANK ROWS (IMPORTANT)
    // ---------------------------------------------------
    if (!row["Hotel Name"] && !row["Address / Location"] && !row["State"]) {
      return; // Skip this empty row
    }

    // ---------------------------------------------------
    // CLEAN & CONVERT PRICE
    // ---------------------------------------------------
    let price = row["Price (Per Night)"];
    if (price) {
      price = price.replace(/,/g, ""); // Remove commas → 14,500 → 14500
      price = Number(price); // Convert to number
    }

    // ---------------------------------------------------
    // PUSH CLEAN DATA TO ARRAY
    // ---------------------------------------------------
    results.push({
      name: row["Hotel Name"],
      address: row["Address / Location"],
      state: row["State"],
      phone: row["Phone"],
      email: row["Email"],
      type: row["Type (Star Category)"],
      rooms: row["Rooms"] || "N/A",
      budget: row["Budget"],
      whoTraveling: row["Who Traveling"],
      facilities: row["Most Popular Facilities"],
      availability: row["Availability"],
      guestReviews: row["Guest Reviews"],
      pricePerNight: price || 0,
      distance: row["Distance From Popular Places"],
      starRating: Number(row["Star Rating"]) || 0,
      imageUrl: row["Image URL"],

      // No destination column → fallback to state
      destination: row["State"],
    });
  })

  // ---------------------------------------------------
  // INSERT INTO MONGODB
  // ---------------------------------------------------
  .on("end", async () => {
    console.log("CSV loaded… inserting into MongoDB…");

    try {
      await Hotel.insertMany(results);
      console.log("✔ Hotels successfully inserted into MongoDB");
      mongoose.connection.close();
    } catch (err) {
      console.error(err);
      mongoose.connection.close();
    }
  });
