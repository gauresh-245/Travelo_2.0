const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ADMIN_USERNAME } = require("../config/adminConfig");


const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const isAdmin = user.username === ADMIN_USERNAME;

  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      isAdmin: isAdmin,
    },
  });
});

module.exports = router;
