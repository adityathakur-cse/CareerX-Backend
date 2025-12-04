import { ImageUploadUtil } from "../Helpers/cloudinary.js";
import Company from "../Models/company.model.js";

export const ImageUpload = async (req, res) => {
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

export const profileUpdate = async (req, res) => {
  const { logoUrl, fullName, location, email, description, hrName, hrEmail } =
    req.body;

  const user = req.user;

  try {
    const company = await Company.findByIdAndUpdate(
      user.id,
      {
        fullName,
        logoUrl,
        location,
        email,
        hrName,
        hrEmail,
        description,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      userInfo: company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};
