import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import Company from "../Models/company.model.js";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
  try {
    const decodedData = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    if (decodedData.role === "STUDENT") {
      const user = await User.findById(decodedData.id).select("-password");
      req.user = user;
    } else {
      const company = await Company.findById(decodedData.id).select(
        "-password"
      );
      req.user = company;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
      error,
    });
  }
};
