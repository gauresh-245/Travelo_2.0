const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// authRoutes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

const transportRoutes = require("./routes/transportRoutes"); // Add this line
app.use("/api/trainflights", transportRoutes);

// HOTEL ROUTES
const hotelRoutes = require("./routes/hotelRoutes");
app.use("/api/hotels", hotelRoutes);

// SEARCH ROUTES  (IMPORTANT)
const searchRoutes = require("./routes/searchRoutes");
app.use("/api/search", searchRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("[MongoDB] Connected Successfully!"))
  .catch((err) => console.error("[MongoDB] Error:", err));

app.get("/", (req, res) => {
  res.send("Travelo Backend Running...");
});
`x`
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
