"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const defaultEducationSchema = {
  typeOfStudy: "",
  areaOfStudy: "",
  institution: "",
  start: "",
  end: "",
  grade: "",
  details: "",
};

const defaultWorkExperenceSchema = {
  title: "",
  company: "",
  start: "",
  end: "",
  details: ""
};

const defaultProfileSchema = {
  name: "",
  email: "",
  contactNo: "",
  socialLinks: [],
  education: [],
  workExperience: [],
  languages: [],
  additionalInformation: "",
};

export default function ProfileForm({user}) {
  const [profile, setProfile] = useState(defaultProfileSchema);
  const [socialLink, setSocialLink] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (!user) return;
    axios.get("/api/profile").then(({data}) => data && setProfile(data));
  }, [user]);

  const setValue = (e, field, many=false) => {
    const value = e.target.value;
    many ? profile[field].push(value) : profile[field] = value;
  };

  const update = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await axios.put("/api/profile", {
      name: "Jared Pek",
      email: "jaredpek2000@gmail.com",
      contactNo: "90909090",
      socialLinks: [
        "github.com/jaredpek", "linkedin.com/jaredpek"
      ],
      education: [
        {
          typeOfStudy: "Bachelor",
          areaOfStudy: "CS",
          institution: "Nanyang Technological University",
          start: new Date("01/01/2022"),
          end: new Date("01/01/2026"),
          grade: "4.44/5",
          details: "Relevant coursework includes data structures and algorithms, object oriented programming, databases, operating systems",
        }
      ],
      workExperience: [
        {
          name: "Software Engineer",
          company: "Hangr Solutions",
          start: new Date("05/27/2024"),
          end: new Date("08/25/2024"),
          details: ""
        }
      ],
      languages: ["English", "Mandarin"],
      additionalInformation: ""
    });
  }

  return <>
    <form className="flex flex-col gap-5" onSubmit={update}>
      <input placeholder="Name..." onChange={e => setValue(e, "name")} />
      <input placeholder="Email..." onChange={e => setValue(e, "email")} />
      <input placeholder="Contact No..." onChange={e => setValue(e, "contactNo")} />
      <div className="flex">
        <input placeholder="Social Link..." value={socialLink} onChange={e => setSocialLink(e.target.value)} />
        <div onClick={() => {
          profile["socialLinks"].push(socialLink);
          setSocialLink("");
        }}>Add</div>
      </div>
      <div className="flex">
        <input placeholder="Language..." value={language} onChange={e => setLanguage(e.target.value)} />
        <div onClick={() => {
          profile["languages"].push(language);
          setLanguage("");
        }}>Add</div>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  </>
}
