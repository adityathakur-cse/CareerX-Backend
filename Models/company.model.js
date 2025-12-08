import mongoose from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "COMPANY",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    hrName: {
      type: String,
    },
    hrEmail: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    internships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

companySchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const Company = mongoose.model("Company", companySchema);

export default Company;
