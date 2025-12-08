import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    stipend: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    internshipType: {
      type: String,
      required: true,
    },
    openings: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    applications: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
