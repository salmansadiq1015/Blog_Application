import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../Controllers/userControllers.js";

// Router Objects
const router = express.Router();

// Get User Route
router.get("/all-users", getAllUsers);

// Create || Register User Route
router.post("/register", registerController);

// Login User Route
router.post("/login", loginController);

export default router;
