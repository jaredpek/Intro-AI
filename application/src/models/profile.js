import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  typeOfStudy: String,
  areaOfStudy: String,
  institution: String,
  start: String,
  end: String,
  grade: String,
  details: String,
})

const workExperienceSchema = new Schema({
  title: String,
  company: String,
  start: String,
  end: String,
  details: String,
});

const languageSchema = new Schema({
  language: String,
  proficiency: String,
});

export const profileSchema = new Schema({
  name: String,
  email: String,
  contactNo: String,
  socialLinks: [String],
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  languages: [languageSchema],
  interests: [String],
  additionalInformation: String,
});

export const Profile = mongoose.models.Profile || mongoose.model(
  "Profile", profileSchema
);
