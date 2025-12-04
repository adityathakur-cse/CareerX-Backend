import User from "../Models/user.model.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import Company from "../Models/company.model.js";

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

    if (role === "STUDENT") {
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
    } else {
      const findCompany = await Company.findOne({ email });
      if (findCompany) {
        return res.status(404).json({
          success: false,
          message: "Company already exists. Please Login",
        });
      }

      await Company.create({
        fullName,
        role,
        email,
        password,
      });
    }

    return res.status(200).json({
      message: `${role} Registered Successfully`,
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
  const { role, email, password } = req.body;
  try {
    if (role === "STUDENT") {
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

      delete findUser.password;

      return res.cookie("token", token).json({
        success: true,
        message: "User Logged In",
        userInfo: findUser,
      });
    } else {
      const findCompany = await Company.findOne({ email });
      if (!findCompany) {
        return res.status(404).json({
          message: "Account doesn't exist",
          success: false,
        });
      }
      const verify = await bcrpyt.compare(password, findCompany.password);
      if (!verify) {
        return res.status(401).json({
          message: "Password is incorrect.",
          success: false,
        });
      }
      const token = jwt.sign(
        {
          id: findCompany._id,
          role: findCompany.role,
          email: findCompany.email,
        },
        process.env.CLIENT_SECRET_KEY,
        {
          expiresIn: "60m",
        }
      );

      delete findCompany.password;

      res.cookie("token", token).json({
        success: true,
        message: "Company Logged In",
        userInfo: findCompany,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};

//Logout Controller
export const Logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "Logged Out Successfully",
    success: true,
  });
};
