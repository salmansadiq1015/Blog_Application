import mongoose from "mongoose";

// Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      message: "Title is required!",
    },
    description: {
      type: String,
      required: true,
      message: "Description is required!",
    },
    image: {
      type: String,
      required: true,
      message: "Image is required!",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      message: "User id is required!",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
