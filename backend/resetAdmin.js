const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// 🔴 CHANGE THIS DB NAME
mongoose.connect("mongodb://127.0.0.1:27017/traveloManagement");

async function resetAdminPassword() {
  const hashedPassword = await bcrypt.hash("gauresh@1234", 10);

  const result = await User.updateOne(
    { username: "gauresh245" },
    { $set: { password: hashedPassword } }
  );

  console.log("✅ Admin password reset successfully");
  console.log(result);

  process.exit();
}

resetAdminPassword();
