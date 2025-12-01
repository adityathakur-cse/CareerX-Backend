import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Auth Router Working",
  });
});

export default authRouter;
