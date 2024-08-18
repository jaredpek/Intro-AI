"use client";

import { useState } from "react";
import InputField from "../fields/InputField";

export default function EducationSection({value, setValue}) {
  const [typeOfStudy, setTypeOfStudy] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [institution, setInstitution] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [grades, setGrades] = useState("");
  const [details, setDetails] = useState("");

  return <InputField title="Education">
    <div className="border rounded-lg p-3 w-full ">
      <div className="border rounded-lg p-3 flex flex-col gap-3">
        <InputField title="Type of Education">
          <input value={typeOfStudy} onChange={e => setTypeOfStudy(e.target.value)} />
        </InputField>
        <InputField title="Area of Study">
          <input value={areaOfStudy} onChange={e => setAreaOfStudy(e.target.value)} />
        </InputField>
        <InputField title="Institution">
          <input value={institution} onChange={e => setInstitution(e.target.value)} />
        </InputField>
        <InputField title="Start Date">
          <input type="date" value={start} onChange={e => setStart(e.target.value)} />
        </InputField>
        <InputField title="End (or Expected) Date">
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        </InputField>
        <InputField title="Grades">
          <input value={grades} onChange={e => setGrades(e.target.value)} />
        </InputField>
        <InputField title="Details">
          <textarea value={details} onChange={e => setDetails(e.target.value)} />
        </InputField>
      </div>
    </div>
  </InputField>
}