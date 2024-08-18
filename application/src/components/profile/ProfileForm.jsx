"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../fields/InputField";
import SocialLinkSection from "./SocialLinkSection";
import EducationSection from "./EducationSection";

export default function ProfileForm({user}) {
  const [nameEntry, setNameEntry] = useState("");
  const [emailEntry, setEmailEntry] = useState("");
  const [contactNoEntry, setContactNoEntry] = useState("");
  const [educationEntry, setEducationEntry] = useState([]);
  const [workExperienceEntry, setWorkExperienceEntry] = useState([]);
  const [languagesEntry, setLanguagesEntry] = useState([]);
  const [socialLnksEntry, setSocialLinksEntry] = useState([]);
  const [additionalInformationEntry, setAdditionalInformationEntry] = useState("");

  useEffect(() => {
    if (!user) return;
    axios.get("/api/profile").then(({data: {
      name, email, contactNo, socialLinks, education, 
      languages, workExperience, additionalInformation
    }}) => {
      setNameEntry(name); setEmailEntry(email); setContactNoEntry(contactNo);
      setSocialLinksEntry(socialLinks); setEducationEntry(education);
      setLanguagesEntry(languages); setWorkExperienceEntry(workExperience);
      setAdditionalInformationEntry(additionalInformation);
    })
  }, [user])

  const update = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await axios.put("/api/profile", {
      name: "Jared Pek",
      email: "jaredpek2000@gmail.com",
      contactNo: "90909090",
      socialLinks: ["www.github.com/jaredpek/", "www.linked.com/in/jaredpek/"],
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
        <input defaultValue={nameEntry} onChange={e => setNameEntry(e.target.value)} />
      </InputField>
      <InputField title="Email">
        <input defaultValue={emailEntry} onChange={e => setEmailEntry(e.target.value)} />
      </InputField>
      <InputField title="Contact Number">
        <input defaultValue={contactNoEntry} onChange={e => setContactNoEntry(e.target.value)} />
      </InputField>
      <EducationSection value={educationEntry} setValue={setEducationEntry} />
      <SocialLinkSection value={socialLnksEntry} setValue={setSocialLinksEntry} />
      <button type="submit">Update Profile</button>
    </form>
  </>
}
