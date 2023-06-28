import blogModel from "../Models/blogModel.js";
import userModel from "../Models/userModel.js";
import mongoose from "mongoose";

//  Get all blogs
export const getAllBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blog Found!",
      });
    }

    res.status(200).send({
      TotalBlog: blogs.length,
      success: true,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all blogs!",
      error,
    });
  }
};

// Create New Blog

export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields!",
      });
    }
    // create Blog
    const existingUser = await userModel.findById(user);
    // Validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Enable to find user!",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    res.status(200).send({
      success: true,
      message: "New blog is created successfully!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while creating new blog!",
      error,
    });
  }
};

// Update Blog

export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Blog is updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating blog!",
      error,
    });
  }
};

// Delete Blog

export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    res.status(200).send({
      success: true,
      message: "Blog is deleted successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog!",
      error,
    });
  }
};

// Get Single Blog
export const singleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "NO Blog Found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting single blog!",
      error,
    });
  }
};

// Get User Blog
export const userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get User Blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting user blog!",
      error,
    });
  }
};
