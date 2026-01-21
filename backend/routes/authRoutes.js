const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!email.endsWith("@gmail.com")) {
  return res.status(400).json({ message: "Email must be Gmail" });
}
const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(409).json({ message: "Email already exists" });
}


if (password.length < 8) {
  return res.status(400).json({ message: "Password must be at least 8 characters" });
}


let uid;
let exists = true;

while (exists) {
  uid = Math.random().toString(36).substring(2, 8).toUpperCase();
  exists = await User.findOne({ uid });
}


  const user = new User({ uid, name, email, password });
  await user.save();

  res.json({
  uid: user.uid,
  name: user.name,
});

});

// LOGIN
router.post("/login", async (req, res) => {
  const { uid } = req.body;


  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }
  const user = await User.findOne({ uid });
   if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
  uid: user.uid,
  name: user.name,
});

});

module.exports = router;
