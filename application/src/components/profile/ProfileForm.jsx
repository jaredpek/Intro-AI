"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../fields/InputField";
import MultiValueSection from "./MultiValueSection";
import EducationSection from "./EducationSection";
import WorkExperienceSection from "./WorkExperienceSection";
import LanguagesSection from "./LanguagesSection";

export default function ProfileForm({user}) {
  const [nameEntry, setNameEntry] = useState("");
  const [emailEntry, setEmailEntry] = useState("");
  const [contactNoEntry, setContactNoEntry] = useState("");
  const [educationEntry, setEducationEntry] = useState([]);
  const [workExperienceEntry, setWorkExperienceEntry] = useState([]);
  const [languagesEntry, setLanguagesEntry] = useState([]);
  const [socialLinksEntry, setSocialLinksEntry] = useState([]);
  const [interestsEntry, setInterestsEntry] = useState([]);
  const [additionalInformationEntry, setAdditionalInformationEntry] = useState("");

  useEffect(() => {
    if (!user) return;
    axios.get("/api/profile").then(({data: {
      name, email, contactNo, socialLinks, education, 
      languages, workExperience, interests,
       additionalInformation
    }}) => {
      setNameEntry(name); setEmailEntry(email); 
      setContactNoEntry(contactNo); setSocialLinksEntry(socialLinks); 
      setEducationEntry(education); setLanguagesEntry(languages); 
      setWorkExperienceEntry(workExperience); setInterestsEntry(interests); 
      setAdditionalInformationEntry(additionalInformation);
    })
  }, [user])

  const update = async () => {
    await axios.put("/api/profile", {
      name: nameEntry, email: emailEntry, contactNo: contactNoEntry,
      education: educationEntry, workExperience: workExperienceEntry,
      languages: languagesEntry, socialLinks: socialLinksEntry,
      additionalInformation: additionalInformationEntry,
      interests: interestsEntry, 
    });
  }

  return <>
    <div className="flex flex-col gap-3">
      <InputField title="Name">
        <input 
          defaultValue={nameEntry} 
          onChange={e => setNameEntry(e.target.value)} 
        />
      </InputField>
      <InputField title="Email">
        <input 
          defaultValue={emailEntry} 
          onChange={e => setEmailEntry(e.target.value)}
        />
      </InputField>
      <InputField title="Contact Number">
        <input 
          defaultValue={contactNoEntry} 
          onChange={e => setContactNoEntry(e.target.value)}
        />
      </InputField>
      <EducationSection 
        value={educationEntry} setValue={setEducationEntry} 
      />
      <WorkExperienceSection
        value={workExperienceEntry} setValue={setWorkExperienceEntry}
      />
      <LanguagesSection
        value={languagesEntry} setValue={setLanguagesEntry}
      />
      <MultiValueSection 
        value={interestsEntry} setValue={setInterestsEntry} 
        title={"Interests"} inputTitle={"Name"}
      />
      <MultiValueSection 
        value={socialLinksEntry} setValue={setSocialLinksEntry} 
        title={"Social Links"} inputTitle={"Link"}
      />
      <InputField title="Additional Information">
        <textarea 
          value={additionalInformationEntry} 
          onChange={e => setAdditionalInformationEntry(e.target.value)}
        />
      </InputField>
      <button onClick={update}>Update Profile</button>
    </div>
  </>
}
