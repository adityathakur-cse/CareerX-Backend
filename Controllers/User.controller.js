import { ImageUploadUtil, ResumeUploadUtil } from "../Helpers/cloudinary.js";
import User from "../Models/user.model.js";

export const uploadProfileImg = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occurred",
      error,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await ResumeUploadUtil(url);

    res.json({
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
    });
  }
};

export const profileUpdate = async (req, res) => {
  const { fullName, email, phone, skills, resumeUrl, profileImg, Socials } =
    req.body;

  try {
    const user = req.user;
    const updatedData = await User.findByIdAndUpdate(
      user.id,
      {
        fullName,
        email,
        phone,
        skills,
        resumeUrl,
        profileImg,
        Socials,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
      userInfo: updatedData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
