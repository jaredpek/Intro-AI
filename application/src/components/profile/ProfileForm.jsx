"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../fields/InputField";
import { IoIosAdd } from "react-icons/io";

const defaultSocialLinkSchema = {
  name: "",
  link: "",
};

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

const defaultLanguageSchema = {
  language: "",
  proficiency: "",
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
  const [socialLink, setSocialLink] = useState(defaultSocialLinkSchema);
  const [language, setLanguage] = useState(defaultLanguageSchema);

  useEffect(() => {
    if (!user) return;
    axios.get("/api/profile").then(({data}) => data && setProfile(data));
  }, [user]);

  const update = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await axios.put("/api/profile", {
      name: "Jared Pek",
      email: "jaredpek2000@gmail.com",
      contactNo: "90909090",
      socialLinks: [
        {name: "github", link: "www.github.com/jaredpek/"},
        {name: "linkedin", link: "www.linked.com/in/jaredpek/"},
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
      languages: [
        {language: "english", proficiency: "native"},
      ],
      additionalInformation: ""
    });
  }

  return <>
    <form className="flex flex-col gap-3" onSubmit={update}>
      <InputField title="Name">
        <input defaultValue={profile.name} onChange={e => profile.name = e.target.value} />
      </InputField>
      <InputField title="Email">
        <input defaultValue={profile.email} onChange={e => profile.email = e.target.value} />
      </InputField>
      <InputField title="Contact Number">
        <input defaultValue={profile.contactNo} onChange={e => profile.contactNo = e.target.value} />
      </InputField>
      <InputField 
        title="Social Link" 
        action={() => {}}
        actionTitle={<IoIosAdd size={24} />}
      >
        <input value={socialLink.name} onChange={e => setSocialLink(e.target.value)} />
        <input value={socialLink.link} onChange={e => setSocialLink(e.target.value)} />
      </InputField>
      <InputField 
        title="Language" 
        action={() => {}}
        actionTitle={<IoIosAdd size={24} />}
      >
        <input value={language.language} onChange={e => setLanguage(e.target.value)} />
        <input value={language.proficiency} onChange={e => setLanguage(e.target.value)} />
      </InputField>
      <button type="submit">Update Profile</button>
    </form>
  </>
}
