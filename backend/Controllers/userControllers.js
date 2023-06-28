import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Create Users || Register

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all required fields!",
      });
    }
    // Existing Email
    const existingUses = await userModel.findOne({ email });
    if (existingUses) {
      return res.status(401).send({
        success: false,
        message: "User is already registered!",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new User
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User is registered successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registering all users!",
      error,
    });
  }
};

//Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      TotalUsers: users.length,
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all users!",
      error,
    });
  }
};

// Login Users

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email || passowrd correctly!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does't exist!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username & password!",
      });
    }
    res.status(200).send({
      success: true,
      message: "User login successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all users!",
      error,
    });
  }
};
