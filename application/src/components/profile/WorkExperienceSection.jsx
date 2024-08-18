"use client";

import { useState } from "react";
import InputField from "../fields/InputField";
import WorkExperienceCard from "./WorkExperienceCard";

export default function WorkExperienceSection({value, setValue}) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [details, setDetails] = useState("");

  const addWorkExperience = () => {
    setValue([...value, {
      title, company, start, end, details,
    }])
    for (let setter of [
      setTitle, setCompany, setStart, setEnd, setDetails
    ]) setter("");
  }

  const deleteWorkExperience = (item) => {
    const values = [...value];
    values.splice(values.indexOf(item), 1);
    setValue(values);
  }

  return <InputField title="Work Experience">
    <div className="border rounded-lg p-3 w-full flex flex-col gap-3">
      {
        !!value.length && value.map(data => <WorkExperienceCard
          key={`${data.company}_${data.title}`} data={data}
          action={() => deleteWorkExperience(data)}
        />)
      }
      <div className="border rounded-lg p-3 flex flex-col gap-3">
        <InputField title="Title">
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </InputField>
        <InputField title="Company">
          <input value={company} onChange={e => setCompany(e.target.value)} />
        </InputField>
        <InputField title="Start Date">
          <input type="date" value={start} onChange={e => setStart(e.target.value)} />
        </InputField>
        <InputField title="End Date">
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        </InputField>
        <InputField title="Details">
          <textarea value={details} onChange={e => setDetails(e.target.value)} />
        </InputField>
        <button onClick={addWorkExperience}>Add</button>
      </div>
    </div>
  </InputField>
}
