import User from "../Models/user.model.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Controller
export const Register = async (req, res) => {
  const { role, fullName, password, email } = req.body;
  try {
    if (!role || !fullName || !password || !email) {
      return res.status(404).json({
        message: "Missing Fields!",
        success: false,
      });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(404).json({
        success: false,
        message: "User already exists. Please Login",
      });
    }

    await User.create({
      fullName,
      role,
      password,
      email,
    });

    return res.status(200).json({
      message: "User Registed Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Some Server error occurred",
      success: false,
      error,
    });
  }
};

// Login Controller
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        message: "Account doesn't exist",
        success: false,
      });
    }

    const verify = await bcrpyt.compare(password, findUser.password);
    if (!verify) {
      return res.status(401).json({
        message: "Password is incorrect.",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: findUser._id, role: findUser.role, email: findUser.email },
      process.env.CLIENT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "User Logged In",
        userInfo: {
          id: findUser._id,
          role: findUser.role,
          email: findUser.email,
          fullName: findUser.fullName,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};
