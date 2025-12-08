import { ImageUploadUtil } from "../Helpers/cloudinary.js";
import Company from "../Models/company.model.js";
import Internship from "../Models/internship.model.js";

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

export const postInternship = async (req, res) => {
  const {
    title,
    description,
    skills,
    duration,
    startDate,
    internshipType,
    stipend,
    openings,
    location,
  } = req.body;

  const company = req.user;

  try {
    const internship = await Internship.create({
      title,
      description,
      skills,
      duration,
      startDate,
      internshipType,
      stipend,
      openings,
      location,
      companyId: company.id,
    });

    const companyInfo = await Company.findByIdAndUpdate(
      company.id,
      {
        $push: { internships: internship._id },
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Internship Posted Successfully",
      success: true,
      userInfo: companyInfo,
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

export const fetchInternships = async (req, res) => {
  const company = req.user;
  try {
    const internships = await Internship.find({ companyId: company.id });
    res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Some error occurred",
      success: true,
      error,
    });
  }
};

export const deleteInternship = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const deleted = await Internship.findOneAndDelete({
      _id: id,
      companyId: user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Internship not found or not yours",
        success: false,
      });
    }

    await Company.findByIdAndUpdate(user.id, {
      $pull: { internships: id },
    });

    res.json({ message: "Internship deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error,
      success: false,
    });
  }
};
