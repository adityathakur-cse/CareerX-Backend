import { Router } from "express";
import { Login, Register } from "../Controllers/Auth.controller.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Auth Router Working",
  });
});
authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/check", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    userInfo: user,
  });
});

export default authRouter;
