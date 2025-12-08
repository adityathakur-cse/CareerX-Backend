import { Router } from "express";
import {
  deleteInternship,
  fetchInternships,
  ImageUpload,
  postInternship,
  profileUpdate,
} from "../Controllers/Company.controller.js";
import { upload } from "../Helpers/cloudinary.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const companyRouter = Router();

companyRouter.post("/imageupload", upload.single("my_file"), ImageUpload);
companyRouter.put("/updateprofile", authMiddleware, profileUpdate);
companyRouter.post("/postintern", authMiddleware, postInternship);
companyRouter.get("/fetchIntern", authMiddleware, fetchInternships);
companyRouter.delete("/delete:id", authMiddleware, deleteInternship);

export default companyRouter;
