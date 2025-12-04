import { Router } from "express";
import {
  ImageUpload,
  profileUpdate,
} from "../Controllers/Company.controller.js";
import { upload } from "../Helpers/cloudinary.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const companyRouter = Router();

companyRouter.post("/imageupload", upload.single("my_file"), ImageUpload);
companyRouter.put("/updateprofile", authMiddleware, profileUpdate);

export default companyRouter;
