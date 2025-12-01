import { Router } from "express";
import { Register } from "../Controllers/Auth.controller.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Auth Router Working",
  });
});
authRouter.post("/register" , Register)

export default authRouter;
