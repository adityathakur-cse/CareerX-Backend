import jwt from "jsonwebtoken";

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
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
};
