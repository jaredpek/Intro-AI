import mongoose, { Schema } from "mongoose";

const socialLinkSchema = new Schema({
  name: String,
  link: String,
})

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
  socialLinks: [socialLinkSchema],
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  languages: [languageSchema],
  additionalInformation: String,
});

export const Profile = mongoose.models.Profile || mongoose.model(
  "Profile", profileSchema
);
