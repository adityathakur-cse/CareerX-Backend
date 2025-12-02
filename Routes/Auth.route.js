import { Router } from "express";
import { Login, Register } from "../Controllers/Auth.controller.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Auth Router Working",
  });
});
authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;
