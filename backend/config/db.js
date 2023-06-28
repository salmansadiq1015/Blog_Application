import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.blue
    );
  } catch (error) {
    console.log(`Mongo Connection Error ${error}`.bgRed.white);
  }
};

export default connectDB;
// module.exports = connectDB;
