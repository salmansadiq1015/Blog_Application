import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogController,
  singleBlogController,
  updateBlogController,
  userBlogController,
} from "../Controllers/blogController.js";

// ROute Objects
const router = express.Router();

// Get || ALl Blog
router.get("/all-blog", getAllBlogController);

// Post ||Create Blog
router.post("/create-blog", createBlogController);

// Get Single Blog
router.get("/single-blog/:id", singleBlogController);

//PUT || update Blog
router.put("/update-blog/:id", updateBlogController);

//Delete || Remove Blog
router.delete("/delete-blog/:id", deleteBlogController);

// Get ||User Blog
router.get("/user-blog/:id", userBlogController);

export default router;
