import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  typeOfStudy: String,
  areaOfStudy: String,
  institution: String,
  start: Date,
  end: Date,
  grade: String,
  details: String,
})

const workExperienceSchema = new Schema({
  title: String,
  company: String,
  start: Date,
  end: Date,
  details: String
});

export const profileSchema = new Schema({
  name: String,
  email: String,
  contactNo: String,
  socialLinks: [String],
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  languages: [String],
  additionalInformation: String,
});

export const Profile = mongoose.models.Profile || mongoose.model(
  "Profile", profileSchema
);
