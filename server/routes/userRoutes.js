const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  protectedRoute,
} = require("../controllers/userController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Protected Route
router.get("/protected", protectedRoute);

module.exports = router;
