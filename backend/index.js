import express from "express";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

// Dotenv configure
dotenv.config();

// Routes
import userRoutes from "./Routes/userRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";

// MongoDB Connection
connectDB();

// Rest Object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Static Routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Port
const PORT = process.env.PORT || 5000;

// Port
app.listen(PORT, () => {
  console.log(
    `Server is reaning ${process.env.DEV_MODE} at port ${PORT}`.bgBlue.white
  );
});
