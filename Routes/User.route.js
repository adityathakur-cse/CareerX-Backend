import { Router } from "express";
import {
  fetchInternships,
  profileUpdate,
  uploadProfileImg,
  uploadResume,
} from "../Controllers/User.controller.js";
import { upload } from "../Helpers/cloudinary.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/uploadResume", upload.single("my_file"), uploadResume);
userRouter.post("/profileImg", upload.single("my_file"), uploadProfileImg);
userRouter.post("/profileUpdate", authMiddleware, profileUpdate);
userRouter.get("/internships", authMiddleware, fetchInternships);

export default userRouter;
