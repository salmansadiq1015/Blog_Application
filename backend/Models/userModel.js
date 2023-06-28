import mongoose from "mongoose";

// Schema
const useSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      message: "username is required!",
    },
    email: {
      type: String,
      required: true,
      message: "Email is required!",
    },
    password: {
      type: String,
      required: true,
      message: "Password is required!",
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", useSchema);
