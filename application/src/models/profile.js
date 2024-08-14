import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  typeOfStudy: String,
  areaOfStudy: String,
  start: Date,
  end: Date,
  details: String,
})

const workExperienceSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  details: String
});

const profileSchema = new Schema({
  name: String,
  email: String,
  contactNo: String,
  socialLinks: [String],
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  languages: [String],
  additionalInformation: String,
});

export const Profile = mongoose.model("Profile", profileSchema);
