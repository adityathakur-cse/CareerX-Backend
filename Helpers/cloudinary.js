import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: "dzqultctf",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const storage = new multer.memoryStorage();

export async function ImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "image",
    folder: "images",
  });

  return result;
}

export async function ResumeUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "resumes",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });

  return result;
}

export const upload = multer({ storage });
